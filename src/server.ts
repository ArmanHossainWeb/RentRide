
import express, { Request, Response } from 'express'
import config from './config'
import initDB from './config/db'

import { authRoutes } from './modules/auth/auth.routes'
import { userRoutes } from './modules/users/user.routes'
import { vehicleRoutes } from './modules/vehicles/vehicle.routes'

const app = express()
const port = config.port




// parser 
app.use(express.json())




// initializing db 
initDB()

app.get('/',  (req: Request, res: Response) => {
  res.send("Hello World!, Arman")
})


// users crud 
app.use("/api/v1/users", userRoutes)

// auth crud 
app.use("/api/v1/auth", authRoutes)

// vehicles crud 
app.use("/api/v1/vehicles", vehicleRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
