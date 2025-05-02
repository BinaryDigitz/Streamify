import { Router } from "express";
import { createUser, loginUser, logout } from '../controllers/auth.controllers.js'
import validateSignup from "../middlewares/validateSignup.js";


const authRouter = Router()

authRouter.post('/sign-up',validateSignup, createUser)

authRouter.post('/sign-in', loginUser)

authRouter.post('/sign-out', logout)

export default authRouter;