import express from 'express'
import "dotenv/config"
import cors from "cors"
import connectDB from './config/mongoDb.js'
import userRouter from './routes/userRoutes.js'

const app=express()
const PORT=process.env.PORT || 4000
await connectDB()

// middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("API working")
})
app.use("/api/user",userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})