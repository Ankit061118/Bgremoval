import express from "express"
import upload from "../middleware/Multer.js"
import authUser from "../middleware/auth.js"
import { removeBGImage } from "../controllers/ImageContoller.js"

const imageRouter=express.Router()

imageRouter.post("/remove-bg",upload.single('image'),authUser,removeBGImage)


export default imageRouter