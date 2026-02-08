import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.createVehicle(req.body)
        return res.status(200).json({ success: true, message: "Vehicle created successfully", data: result.rows[0] })
    }
    catch(error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.getVehicles()
        return res.status(200).json({ success: true, message: "Vehicles found successfully", data: result.rows })
    }
    catch(error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getSingle = async (req: Request, res: Response) => {
  try {
    

    const result = await vehicleService.getSingle(req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle found",
      data: result.rows[0], // single vehicle
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
    try{
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body
        const result = await vehicleService.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status,req.params.id as string)
        return res.status(200).json({ success: true, message: "Vehicle updated successfully", data: result.rows[0] })
    }
    catch(error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const deleteVehicle = async (req: Request, res: Response) => {
    try{
        const result = await vehicleService.deleteVehicle(req.params.id as string)
        return res.status(200).json({ success: true, message: "Vehicle deleted successfully", data: result.rows[0] })
    }
    catch(error: any) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const  vehicleController = {
    createVehicle,
    getVehicles,
    getSingle,
    updateVehicle,
    deleteVehicle
    
}