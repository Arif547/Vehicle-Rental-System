import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";


const router = Router()


router.get('/', auth(Roles.admin), userController.getAllUser)
router.get('/:id', auth(Roles.admin), userController.getSingleUser)
router.delete("/:id", auth(Roles.admin), userController.deleteUser);
router.put("/:id",auth(Roles.admin, Roles.customer), userController.updateUser);

export const userRoute = router