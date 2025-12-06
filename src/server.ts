require('dotenv').config(); 
import express, { Request, Response } from "express"
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./database/db";

const app = express()
const port = process.env.PORT || 8080;

app.use(express.json());

initDB()

app.use('/api/v1/auth/signup', userRoute)


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'this is the root',
    path: req.path
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
