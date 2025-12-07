import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";



const router = Router()

router.post('/', authController.signUpUser)
router.post('/signin', authController.signIn)

export const authRoute = router