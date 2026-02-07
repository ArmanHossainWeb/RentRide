import bcrypt from "bcryptjs";
import { pool } from "../../config/db"
import jwt from "jsonwebtoken"

export const secret = "KMUFsIDTnPmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"

const loginUser = async (email: string, password: string) => {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (user.rows.length === 0) {
        throw new Error("User not found")
    }

    const matchPasswod = await bcrypt.compare(password, user.rows[0].password);

    if (!matchPasswod) {
        throw new Error("Invalid password")
    }

    const jwtPaylod = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    
    const token = jwt.sign(jwtPaylod, secret, { expiresIn: "7d" })

    return {token, user:user.rows}
}

export const authService = {
    loginUser
}