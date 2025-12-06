import { Request, Response, Router } from "express";
import { pool } from "../../database/db";
import { userController } from "./user.contorller";

const router = Router()

router.post('/', userController.signUpUser)

export const userRoute = router