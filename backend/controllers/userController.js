import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import AppointementModel from '../models/AppointementModel.js'

const registerUser=async(req,res)=>{
    try {
        
        const{name,email,password}=req.body

        if(!name||!email||!password){
            return res.json({success:false,message:"missing details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }

        const newUser=new userModel(userData)
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//login

const loginUser=async(req,res)=>{
    try {
        
        const {email,password}=req.body
        const user=await userModel.findOne({email})

        if(!user){
        return res.json({success:false,message:"User doesn't exist"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to get user profile data

const getProfile = async (req, res) => {
    try {
      const { id } = req.user; // Get userId from req.user (set by authUser middleware)
      
      const userData = await userModel.findById(id).select('-password');
      
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

//api to update userprofile\
const updateProfile = async (req, res) => {
    try {
      const { name, phone, address, dob, gender } = req.body;
      const userId = req.user.id; // ✅ Use this now
      const imageFile = req.file;
  
      if (!name || !phone || !address || !dob || !gender) {
        return res.json({ success: false, message: "Data Missing" });
      }
  
      await userModel.findByIdAndUpdate(userId, {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      });
  
      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;
  
        await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      }
  
      res.json({ success: true, message: "Profile updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


  //API to book appointment
  const bookAppointment = async (req, res) => {
    try {
      const userId = req.user.id;
      const { docId, slotDate, slotTime } = req.body;
  
      if (!docId || !slotDate || !slotTime) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      const docData = await doctorModel.findById(docId).select("-password");
      if (!docData.available) {
        return res.json({ success: false, message: "Doctor not available" });
      }
  
      let slots_booked = docData.slots_booked || {};
  
      if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
          return res.json({ success: false, message: "Slot not available" });
        } else {
          slots_booked[slotDate].push(slotTime);
        }
      } else {
        slots_booked[slotDate] = [slotTime];
      }
  
      const userData = await userModel.findById(userId).select("-password");
      delete docData.slots_booked;
  
      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount: docData.fees,
        slotTime,
        slotDate,
        date: Date.now()
      };
  
      const newAppointment = new AppointementModel(appointmentData);
      await newAppointment.save();
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: "Appointment booked" });
  
    } catch (error) {
      console.log("Error in booking appointment:", error.message);
      res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  };

  //api to get user appointments for frontend
  
  const listAppointments = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const appointments = await AppointementModel.find({ userId });
  
      res.json({ success: true, appointments });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
//Api to cancle appointement

const cancleAppointment = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const { appointmentId } = req.body;

    const appointmentData = await AppointementModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // ✅ Convert both to string safely
    const appointmentUserId = String(
      appointmentData.userId?._id || appointmentData.userId
    );

    if (appointmentUserId !== String(userId)) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    // ✅ Cancel appointment
    await AppointementModel.findByIdAndUpdate(appointmentId, { cancleled: true });

    // ✅ Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
  
export {registerUser,loginUser,getProfile,updateProfile, bookAppointment,listAppointments,cancleAppointment}