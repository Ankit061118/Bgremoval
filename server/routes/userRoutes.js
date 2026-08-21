import express from "express"
import { clerkWebHooks } from "../controllers/UserController.js"
import authUser from "../middleware/auth.js"

const userRouter=express.Router()

userRouter.post('/webhooks',clerkWebHooks)
userRouter.get('/credits',authUser,userCredits)


export default userRouter