import { pool } from "../../config/db"

const createUser = async (payload:Record<string, unknown>) => {
    const {name, email, password, phone} = payload

    const result = await pool.query("INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *", [name, email, password, phone])
    return result
}

const getUser = async () => {
    const result = await pool.query("SELECT * FROM users")
    return result;

}

const getSingle = async(id:string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
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