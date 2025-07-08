import express from 'express'
import {registerUser,loginUser, getProfile,updateProfile,bookAppointment, listAppointments,cancleAppointment} from '../controllers/userController.js'
import { authUser } from '../middleware/authUser.js'
import { Upload } from '../middleware/multer.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',Upload.single('image'),authUser,updateProfile)

userRouter.post('/book-appointment',authUser,bookAppointment)

userRouter.post('/myappointment',authUser,listAppointments)


userRouter.post('/cancle-appointment',authUser,cancleAppointment)


export default userRouter 