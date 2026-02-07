import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`
});


const initDB = async() => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
    CHECK (email = LOWER(email)),
    password TEXT NOT NULL
    CHECK ( LENGTH (COALESCE(password, '')) >= 6),
    phone VARCHAR(100) NOT NULL ,
    role VARCHAR(100) NOT NULL DEFAULT 'user'
    CHECK (role IN ('admin', 'user'))
    )
    `)
}

export default initDB;