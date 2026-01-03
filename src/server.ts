
import express, { Request, Response } from 'express'
import config from './config'
import initDB from './config/db'
import logger from './middleware/logger'
import { userRoutes } from './modules/user/user.routes'

const app = express()
const port = config.port




// parser 
app.use(express.json())




// initializing db 
initDB()

app.get('/', logger, (req: Request, res: Response) => {
  res.send("Hello World!, Arman")
})


// user crud 
app.use("/users", userRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
