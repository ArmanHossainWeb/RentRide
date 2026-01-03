import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body)
        // console.log(result)

        res.status(200).json({
            success: true,
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUser()
        res.status(200).json({
            success: true,
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

const getSingle = async (req: Request, res: Response) => {
    try {
        const result = await userService.getSingle(req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User found",
                data: result.rows

            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateUser = async(req:Request, res:Response)=> {

    const {name, email, password, phone}= req.body;
    try {
        const result = await userService.updateUser(name, email, password, phone, req.params.id as string)

        if(result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated",
                data: result.rows[0]
            })
        }
        
    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteUser = async(req:Request, res:Response)=> {
    try {
        const result = await userService.deleteUser(req.params.id as string)
        if(result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted",
                data: result.rows
            })
        }
        
    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const userController = {
    createUser,
    getUser,
    getSingle,
    updateUser,
    deleteUser
}