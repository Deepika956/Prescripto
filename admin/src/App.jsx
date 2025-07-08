import React, { useContext } from 'react'
import Login from "../src/pages/Login"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar.jsx'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import { DoctorList } from './pages/Admin/DoctorList'


const App = () => {
  const{aToken}=useContext(AdminContext)

  return aToken?(
    <div className='bg-[#f8f9fd]'>
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar />

      <Routes>
        {/* <Route path='/' element={<></>}  /> */}
        <Route path='/' element={<Dashboard />}  />
        <Route path='/all-appointments' element={<AllAppointments />}  />
        <Route path='/add-doctor' element={<AddDoctor />}  />
        <Route path='/doctor-list' element={<DoctorList />}  />

      </Routes>


     </div>
    </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}



export default App
