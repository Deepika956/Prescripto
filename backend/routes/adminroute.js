import express from 'express';
import {addDoctor,loginAdmin, allDoctors, appointmentsAdmin, appointmentCancle,adminDashboard} from '../controllers/admincontroller.js'
import {Upload}  from '../middleware/multer.js'
import {authAdmin} from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorcontroller.js';


const adminRouter = express.Router()
adminRouter.post('/add-doctor',authAdmin,Upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)

adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancle-appointment',authAdmin,appointmentCancle)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter
