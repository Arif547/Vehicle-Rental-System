 require('dotenv').config();

import { Pool } from "pg";

export const pool = new Pool({
    connectionString : process.env.DATABASE
})

export const initDB = async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
        create_at TIMESTAMP DEFAULT NOW (),
        update_at TIMESTAMP DEFAULT NOW ()
        )
        `)

        console.log('connected database');
}

