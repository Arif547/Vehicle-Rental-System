import { Request, Response, Router } from "express";
import { pool } from "../../database/db";

const router = Router()

router.post('/', async (req: Request, res: Response) =>{
    const {name, email, password, phone, role} = req.body;
    const result = await pool.query(`
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,[name, email, password, phone, role] );
    res.status(201).json({
        success: true,
        message: "User Create success",
        data : result.rows[0]
    })
})

export const userRoute = router