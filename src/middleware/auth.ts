 require('dotenv').config();
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const auth = (...roles: string[]) =>{
    return async (req:Request , res: Response, next: NextFunction) =>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json(
                {
                    message: "Unauthorized access"
                }
            )
        }

        let token: any = authHeader;

    if (token.startsWith("Bearer ")) {
             token = token.split(" ")[1]; // remove Bearer
    }       

        // Here you can add your token verification logic
        const decodedToken = jwt.verify(token, process.env.JWT_KEY as any) as JwtPayload;

        // console.log('Decoded Token:', decodedToken);

        const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, [decodedToken.email]);  

        if(user.rows.length === 0){            
            return res.status(404).json(
                {   
                    "success": false,
                    message: "User Not found"
                }
            )
        }
        req.user = decodedToken;  
        
        if (roles.length && !roles.includes(decodedToken.role)) {
        return res.status(403).json(
            {   
                "success": false,
                message: "You are not authorized" })       
        }
      next()

}
}

export default auth;