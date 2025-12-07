import { pool } from "../../config/db";

const vehicleIntoDB = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result
}

const getAllVehiclesFromDB = async () => {
    const result = await pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status role FROM vehicles`);
    return result;
}

const getSingleVehiclesFromDB = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

    return result;
};

const deleteVehicles = async (id: string) => {
    // const bookingCheck = await pool.query(`
    //     SELECT * FROM vehicles WHERE id = $1 AND availability_status = 'active'
    //     `, [id])

    // if (bookingCheck.rows.length > 0) {
    //     return {
    //         success: false,
    //         message: "Vehicle cannot be deleted because it has active bookings."
    //     };
    // }

    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

    return result;
};

export const vehicleService = {
    vehicleIntoDB,
    getAllVehiclesFromDB,
    getSingleVehiclesFromDB,
    deleteVehicles

}   