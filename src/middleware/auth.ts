import { NextFunction, Request, Response } from "express"


const auth = () =>{
    return async (req:Request , res: Response, next: NextFunction) =>{
        const ID = false;
        if(!ID){
            throw new Error ("Not Allowed")
        }

        next()
    }
}