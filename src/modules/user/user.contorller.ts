import { Request, Response } from "express";
import { pool } from "../../database/db";
import { userServices } from "./user.service";

const signUpUser = async (req: Request, res: Response) =>{
try{
    const result = await userServices.signupUserIntoDB(req.body)
   return res.status(201).json({
        success: true,
        message: "User Create success",
        data : result.rows[0]
    })
   }catch(error: any){
   return res.status(500).json({
        success: false,
        message: error.message,
        
    })
   }

}

export const userController = {
    signUpUser
}   