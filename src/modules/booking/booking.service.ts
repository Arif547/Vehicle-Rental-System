import { pool } from "../../config/db";
import formatBookings from "./booking.formatBookings";

const createBookingInDB = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicle = await pool.query(`SELECT availability_status, daily_rent_price, vehicle_name FROM vehicles WHERE id = $1`, [vehicle_id]);

    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [customer_id]);

    if (user.rows.length === 0) {
        return {
            success: false,
            message: "Customer not found"
        };
    }

    if (vehicle.rows.length === 0) {
        return {
            success: false,
            message: "Vehicle not found"
        };
    }

    if (vehicle.rows[0].availability_status !== 'available') {
        return {
            success: false,
            message: "Vehicle is not available"
        };

    } else {
        const start = new Date(rent_start_date as string);

        const end = new Date(rent_end_date as string);

        const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

        if (diff <= 0) {
            return {
                success: false,
                message: "Invalid rental period"
            };
        }

        const total_price = diff * vehicle.rows[0].daily_rent_price;
        console.log("Total price calculated:", total_price);

        const booking = await pool.query(`
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *
        `, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);

        await pool.query(`UPDATE vehicles SET availability_status = 'rented' WHERE id = $1`, [vehicle_id]);

        return {
            success: true,
            message: "Booking created successfully",
            data: {
                booking: booking.rows[0],
                vehicle: {
                    vehicle_name: vehicle.rows[0].vehicle_name,
                    daily_rent_price: vehicle.rows[0].daily_rent_price
                }
            }
        };
    }
}

const getAllBookingsFromDB = async (user: any) => {
    let query = `
    SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      u.name AS customer_name,
      u.email AS customer_email,
      v.vehicle_name,
      v.type,
      v.registration_number
    FROM bookings b
    JOIN users u ON u.id = b.customer_id
    JOIN vehicles v ON v.id = b.vehicle_id
    
  `;

    const params: any[] = [];

    if (user.role === 'customer') {
        query += ` WHERE b.customer_id = $1`;
        params.push(user.id);
    }

    query += ` ORDER BY b.id DESC`;

    const result = await pool.query(query, params);

    console.log("Bookings fetched:", result.rows);

    return formatBookings(result.rows, user.role);

};

export const bookingService = {
    createBookingInDB,
    getAllBookingsFromDB

}