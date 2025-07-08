import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
import doctorRouter from './routes/doctorroute.js'
import userRouter from './routes/userRoute.js'



const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING great')
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});