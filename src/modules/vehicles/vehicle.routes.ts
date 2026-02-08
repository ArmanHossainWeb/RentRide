import express from "express";
import { vehicleController } from "./vehicle.controller";

const router = express.Router();

router.post("/", vehicleController.createVehicle)
router.get("/", vehicleController.getVehicles)
router.get("/:id", vehicleController.getSingle)
router.put("/:id", vehicleController.updateVehicle)
router.delete("/:id", vehicleController.deleteVehicle)


export const vehicleRoutes = router;