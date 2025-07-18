
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login=()=>{


    const {backendUrl,token,setToken}=useContext(AppContext)

    const navigate=useNavigate()

    const [state,setState]=useState('Sign Up');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');



    const onSubmitHanlder=async(event)=>{
        event.preventDefault(); //not reload the webpage

        try {
          
          if(state=='Sign Up'){
            const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})

            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
            }
            else{
              toast.error(data.message)
            }
          }
          else{
            
            const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})

            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
            }
            else{
              toast.error(data.message)
            }
          }

        } catch (error) {

          toast.error(error.message)
          
        }
    }


    useEffect(()=>{

      if(token){
        navigate('/')
      }

    },[token])


    return(
      <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHanlder}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        <p>Please {state === 'Sign Up' ? "Sign up" : "Login"} to book appointment</p>
    
        {state === 'Sign Up' && (
          <div className="w-full">
            <label>Full Name</label> {/* Using label instead of p */}
            <input
              className="border border-zinc-500 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
    
        <div className="w-full">
          <label>Email</label> {/* Using label instead of p */}
          <input
            className="border border-zinc-500 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
    
        <div className="w-full">
          <label>Password</label> {/* Using label instead of p */}
          <input
            className="border border-zinc-500 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
    
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-balance">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>
    
        {state === "Sign Up" ? (
          <p>Already have an account? 
            <span
              onClick={() => setState('Login')}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>Create an account? 
            <span
              onClick={() => setState('Sign Up')}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
    
    )
}
export default Login;