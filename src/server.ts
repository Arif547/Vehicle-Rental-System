require('dotenv').config();
import express, { Request, Response } from "express"
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./config/db";
import { authRoute } from "./modules/auth/auth.route";
import config from "./config";
import { vehicleRoute } from "./modules/vehicle/vehicle.route";
import { bookingRoute } from "./modules/booking/booking.route";

const app = express()
const port = config.port;

app.use(express.json());

initDB()

app.use('/api/v1/auth/signup', authRoute)
app.use('/api/v1/auth/', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/vehicles', vehicleRoute)
app.use('/api/v1/bookings', bookingRoute)


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'this is the root',
    path: req.path
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
