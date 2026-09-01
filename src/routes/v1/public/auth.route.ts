import { Router } from "express";
import { authController } from "../../../controllers/credential.controller.js";
import { Validation } from "../../../middleware/validation.js";
import { insertUserSchema } from "../../../schema/user.schema.js";
export const authRoute = Router();

authRoute.post("/login", authController.login);

authRoute.post(
  "/register",
  Validation(insertUserSchema),
  authController.register,
);
