import { Router } from "express";
import { authController } from "../../../controllers/credential.controller.ts";
import { Validation } from "../../../middleware/validation.ts";
import { insertUserSchema } from "../../../schema/user.schema.ts";
export const authRoute = Router();

authRoute.post("/login", authController.login);

authRoute.post(
  "/register",
  Validation(insertUserSchema),
  authController.register,
);
