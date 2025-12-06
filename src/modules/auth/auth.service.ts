import bcrypt from "bcryptjs"
import { pool } from "../../database/db"

const signinUserIntoDB = async (email: string, password: string) =>{
    const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])
        
        const matchPassword = await bcrypt.compare(password,user.rows[0].password)
        
        if(!matchPassword){
            throw new Error ("Password doesn't Match")
        }

        return user
}

export const authService = {
    signinUserIntoDB
}