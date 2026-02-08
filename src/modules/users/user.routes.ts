import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = express.Router();

router.post("/", userController.createUser)

router.get("/", auth(Roles.admin), userController.getUser)

router.get("/getSingle",auth(Roles.user), userController.getSingle)

router.put("/:id", userController.updateUser)

router.delete("/:id", userController.deleteUser)


export const userRoutes = router;