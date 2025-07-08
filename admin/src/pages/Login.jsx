import React,{useContext, useState} from 'react'
import {assets} from "../assets/assets"
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'


const Login = () => {

  const [state,setState]=useState('Admin')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const {setAtoken,backendUrl}=useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password
        });
  
        console.log("🚀 Login response:", data);
  
        if (data.success) {
          console.log("✅ Token received:", data.token);
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          toast.success("Login successful!");
        } else {
          console.warn("⚠️ Login failed:", data.message);
          toast.error(data.message);
        }
      } else {
        toast.error("Doctor login not implemented.");
      }
    } catch (error) {
      console.error(
        "❌ Login Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2x1 font-semibold m-auto'><span className='text-[#5f6fff]'>{state}</span>Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" name="" id="" required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" name="" id="" required/>
        </div>
        <button className='bg-[#5f6fff] text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state ==='Admin'
          ?<p>Doctor Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
          : <p>Admin Login? <span className='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
