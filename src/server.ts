
import express, { Request, Response } from 'express'
import config from './config'
import initDB from './config/db'
import { userRoutes } from './modules/user/user.routes'
import { authRoutes } from './modules/auth/auth.routes'

const app = express()
const port = config.port




// parser 
app.use(express.json())




// initializing db 
initDB()

app.get('/',  (req: Request, res: Response) => {
  res.send("Hello World!, Arman")
})


// user crud 
app.use("/api/v1/users", userRoutes)

// auth crud 
app.use("/api/v1/auth", authRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
