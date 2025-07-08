import React, { useEffect } from "react";
import { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Myappointment = () => {
  const { backendUrl,token,getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months=[[],"Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]
  const slotDateFormat = (slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/myappointment',
        {}, // empty POST body
        { headers: { token } }
      );
  
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
  
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const cancleAppointment=async(appointmentId)=>{
    
    try{

      // console.log(appointmentId)

      const {data}=await axios.post(backendUrl+'/api/user/cancle-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)

      }

    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }


  }


  useEffect(()=>{

    if(token){
      getUserAppointments()
    }


  },[token])


  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointement
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name} </p>
              <p>{item.docData.speciality} </p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1} </p>
              <p className="text-xs">{item.docData.address.line2} </p>
              <p className="text-sm mt-1">
                Date & Time:
                <span className="text-sm font-medium text-neutral-700">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
                </span>{" "}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-center">
            {/* {!item.cancleled &&  <button
                className="text-sm text-stone-500 text-center sm:min-w-48 
        py-2 border hover:bg-primary  transition-all duration-300"
              >
                Pay Online
              </button>} */}
              {!item.cancleled && <button onClick={()=>cancleAppointment(item._id)}
                className="text-sm text-stone-500 text-center sm:min-w-48
         py-2 border hover:bg-red-500 transition-all duration-300"
              >
                Cancel Appointment
              </button> }
              {item.cancleled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Myappointment;
