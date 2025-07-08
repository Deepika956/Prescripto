import React from "react"
import {Route,Routes} from 'react-router-dom'

import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
// import contact from "./pages/contact"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Myappointment from "./pages/Myappointment"
import Myprofile from "./pages/Myprofile"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Footer from "./components/Footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const App=() =>{
  return (
 <div className='mx-4 sm:mx-[10%]'>
  <ToastContainer/>
 <Navbar/>

 <Routes>
<Route path='/'element={<Home/>}/>
<Route path='/doctors'element={<Doctors/>}/>
<Route path='/doctors/:speciality'element={<Doctors/>}/>
<Route path='/login'element={<Login/>}/>
<Route path='/about'element={<About/>}/>
<Route path='/Contact'element={<Contact/>}/>
<Route path='/myprofile'element={<Myprofile/>}/>
<Route path='/myappointment'element={<Myappointment/>}/>
<Route path='/appointment/:docId'element={<Appointment/>}/>


 </Routes>
 <Footer/>
 </div>
  )
}

export default App
