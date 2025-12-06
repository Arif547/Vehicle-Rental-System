import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";



const router = Router()

router.post('/signin', authController.signIn)

export const authRoute = router