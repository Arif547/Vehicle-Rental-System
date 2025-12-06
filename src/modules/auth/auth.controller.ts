import { Request, Response } from "express";
import { authService } from "./auth.service";


const signIn = async (req: Request, res: Response) =>{
    try{
        const result = await authService.signinUserIntoDB(req.body.email, req.body.password)
       
    return res.status(201).json({
        success: true,
        message: "Login successful",
        data : result.rows[0]
    })
    }catch(error: any){
        return res.status(500).json({
        success: false,
        message: error.message,        
    })
   }
}


export const authController = {
    signIn
}