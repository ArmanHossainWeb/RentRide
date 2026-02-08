import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`
});


const initDB = async () => {
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
  await pool.query(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(20) NOT NULL 
      DEFAULT 'available' 
      CHECK (availability_status IN ('available', 'booked'))
  );
`);

}

export default initDB;