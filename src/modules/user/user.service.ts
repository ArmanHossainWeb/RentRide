import { pool } from "../../config/db"

const createUser = async (payload:Record<string, unknown>) => {
    const {name, email, password, phone} = payload

    const result = await pool.query("INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *", [name, email, password, phone])
    return result
}

export const userService = {
    createUser
}