import bcrypt from "bcryptjs";
import { pool } from "../../database/db";



const getAllUserFromDB = async()=>{
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);    
    return result;
}  

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return result;
};

const updateUser = async (id: string, name?: string, email?: string, phone?: string, role?: string) => {
  const result = await pool.query( `
      UPDATE users
      SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        role = COALESCE($4, role),
        update_at = NOW()
      WHERE id = $5
      RETURNING id, name, email, phone, role;
    `, [name, email, phone, role, id]);

  return result;
};

export const userServices = {
    getAllUserFromDB,
    getSingleUser,
    deleteUser,
    updateUser
}