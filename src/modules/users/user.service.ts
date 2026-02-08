import bcrypt from "bcryptjs"
import { pool } from "../../config/db"




const createUser = async (payload:Record<string, unknown>) => {
    const {name, email, password, phone,role} = payload


    const passwordHash = await bcrypt.hash(password as string, 12);

    const result = await pool.query("INSERT INTO users(name, email, password, phone,role) VALUES($1, $2, $3, $4,$5) RETURNING id,name,email,phone,role", [name, email, passwordHash, phone,role])

    // delete result.rows[0].password;
    
    return result
}

const getUser = async () => {
    const result = await pool.query("SELECT id, name, email,phone, role FROM users")
    return result;

}

const getSingle = async(email:string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    return result
}


const updateUser = async (name:string, email:string, password:string, phone:string, id:string) => {
    const result = await pool.query("UPDATE users SET name =$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING *", [name, email, password, phone, id])
    return result;
}

const deleteUser = async (id:string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result;
}

export const userService = {
    createUser,
    getUser,
    getSingle,
    updateUser,
    deleteUser
}