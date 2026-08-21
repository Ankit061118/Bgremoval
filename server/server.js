import express from 'express'
import "dotenv/config"
import cors from "cors"
import connectDB from './config/mongoDb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

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
app.use("/api/image",imageRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})