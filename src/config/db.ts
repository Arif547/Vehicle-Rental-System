 require('dotenv').config();
 import config from "./";

import { Pool } from "pg";

export const pool = new Pool({
    connectionString : config.connection_str,
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
        
    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(100) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10,2) NOT NULL,
        availability_status VARCHAR(50) NOT NULL CHECK (availability_status IN ('available', 'rented', 'maintenance')),
        create_at TIMESTAMP DEFAULT NOW (),
        update_at TIMESTAMP DEFAULT NOW ()
        )
        `)

        console.log('connected database');
}

