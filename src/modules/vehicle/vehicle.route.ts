import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import { Roles } from "../auth/auth.constant";
import auth from "../../middleware/auth";



const router = Router()

router.post('/', auth(Roles.admin), vehicleController.createVehicles)
router.get('/', vehicleController.getAllVehicles)
router.get('/:vehicleId', vehicleController.getSingleVehicle)
router.delete("/:vehicleId", auth(Roles.admin), vehicleController.deleteVehicle);
router.put("/:vehicleId", auth(Roles.admin), vehicleController.updateVehicle);

export const vehicleRoute = router