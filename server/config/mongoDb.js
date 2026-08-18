import mongoose from "mongoose";
import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB=async()=>{
   try {
     await mongoose.connect(`${process.env.MONGO_URI}/bg-removal`)
     console.log("Db connected")
   } catch (error) {
    console.log(error)
    
   }
}

export default connectDB