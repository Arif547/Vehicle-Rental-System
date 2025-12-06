import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.controller";
import verify from "../../middleware/verify";


const router = Router()

router.post('/', userController.signUpUser)

export const userRoute = router