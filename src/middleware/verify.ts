import { NextFunction, Request, Response } from "express";

const verify = (req: Request, res: Response, next: NextFunction) =>{
    console.log('verfiy middleware called');
}

export default verify;