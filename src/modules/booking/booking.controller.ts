import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {

    try {
        const result = await bookingService.createBookingInDB(req.body);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message,

            });
        }
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.data,
        });


    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user as any;

        const result = await bookingService.getAllBookingsFromDB(user);


        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Booking found",
                data: [],
            });
        }
        return res.status(201).json({
            success: true,
            message: user.role === 'admin' ? "All bookings retrieved successfully" : "Your bookings retrieved successfully",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,

        })
    }

}

export const bookingController = {
    createBooking,
    getAllBookings
}