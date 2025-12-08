import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth"
import { Roles } from "../auth/auth.constant";


const router = Router()

router.post('/', bookingController.createBooking)
router.get('/', auth(Roles.admin, Roles.customer), bookingController.getAllBookings)
router.put('/:bookingId', auth(Roles.admin, Roles.customer), bookingController.bookingUpdate)

export const bookingRoute = router