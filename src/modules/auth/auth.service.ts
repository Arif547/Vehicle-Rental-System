require('dotenv').config();
import bcrypt from "bcryptjs"
import { pool } from "../../database/db"
import jwt from 'jsonwebtoken'

const signupUserIntoDB = async(payload : Record<string, unknown>)=>{
    const {name, email, password, phone, role} = payload;

    const hashPassword = await bcrypt.hash(password as string, 12);
    
    const result = await pool.query(`
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,[name, email, hashPassword, phone, role] );

        delete result.rows[0].password

        return result
}

const signinUserIntoDB = async (email: string, password: string) =>{
        const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

        if(user.rows.length === 0){            
            throw new Error ("User Not found")
        }
        const matchPassword = await bcrypt.compare(password,user.rows[0].password)
        
        if(!matchPassword){
            throw new Error ("Password doesn't Match")
        }

        const jwtPayload = {
            id: user.rows[0].id,
            name : user.rows[0].name,
            email: user.rows[0].email,
            role: user.rows[0].role

        }
        const secretKey : any = process.env.JWT_KEY
        
        const token = jwt.sign(jwtPayload, secretKey ,{expiresIn : "3d"})
        delete user.rows[0].password
        return {token, user: user.rows[0]}
}

export const authService = {
    signupUserIntoDB,
    signinUserIntoDB
}