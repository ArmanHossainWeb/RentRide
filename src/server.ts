
import  express, { Request, Response }  from 'express'
import {Pool} from "pg"
import dotenv from "dotenv";
import path from "path"


dotenv.config({path: path.join(process.cwd(), ".env")});
const app = express()
const port = 5000




// parser 
app.use(express.json())


// db 
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
});


const initDB = async() => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL ,
    phone VARCHAR(100) NOT NULL ,
    role TEXT DEFAULT 'user'
    )
    `)
}

initDB()

app.get('/', (req:Request, res:Response) => {
  res.send("Hello World!, Arman")
})

app.post("/users",(req:Request, res:Response)=> {
  console.log(req.body)

  res.status(200).json({
    success:"true",
    message:"API is working.."
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
