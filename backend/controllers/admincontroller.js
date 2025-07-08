import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";

import jwt from 'jsonwebtoken'
import AppointementModel from "../models/AppointementModel.js";
import userModel from "../models/usermodel.js";



const addDoctor = async (req, res) => {
    try {
      // Log the entire form data
      console.log("Request Body:", req.body);
  
      // If you're using `multer` for handling file uploads, make sure `req.body` contains the data you're sending
      const { name, email, password, speciality, degree, experience, fees, about, address } = req.body;
      const imageFile=req.file
      console.log("Received degree:", degree);  // Check if degree is there
  
      if (!degree) {
        return res.json({ success: false, message: "Degree is missing in the request body" });
      }
  
      // Proceed with your logic (hashing password, image upload, etc.)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;
  
      const doctorData = {
        name,
        email,
        image: imageUrl,
        password: hashedPassword,
        speciality,
        experience,
        about,
        fees,
        degree,
        address: JSON.parse(address),
        date: Date.now(),
      };
  
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  const loginAdmin=async(req,res)=>{
        try{
    
            const {email,password}=req.body
    
            if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
    
                const token=jwt.sign(email+password,process.env.JWT_SECRET)
                res.json({success:true,token})
    
    
            }else{
                res.json({success:false,message:"Invalid credentials"})
            }
    
        }catch(error){
            res.json({success:false,message:error.message})
        }
    }

    //api to get all doctorslist 

    const allDoctors=async(req,res)=>{
      try{
          const doctors=await doctorModel.find({}).select('-password')
          res.json({success:true,doctors})
      }
      catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }
    }

    //api to get all appointments list

    const appointmentsAdmin=async(req,res)=>{
      try{

        const appointments = await AppointementModel.find({})
        res.json({success:true,appointments})

      }
      catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }
    }


    //api for appointment cancellation


const appointmentCancle = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await AppointementModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
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
//api to get dashboard data for admin

  const adminDashboard = async(req,res)=>{
    try {

      const doctors=await doctorModel.find({})
      const users=await userModel.find({})
      const appointments=await AppointementModel.find({})

      const dashData={
        doctors:doctors.length,
        appointments:appointments.length,
        patients:users.length,
        latestAppointments:appointments.reverse().slice(0,5)

      }
      res.json({success:true,dashData})
      
    } catch (error) {
      
    console.log(error);
    res.json({ success: false, message: error.message });
    }
  }

  export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancle,adminDashboard}