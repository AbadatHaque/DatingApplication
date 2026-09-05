import { Router } from "express";
import { authController } from "../../../controllers/credential.controller.ts";
import { Validation } from "../../../middleware/validation.ts";
import { insertUserSchema } from "../../../schema/user.schema.ts";
export const authRoute = Router();

authRoute.post("/login", authController.login);
authRoute.post("/logout", authController.logOut);
authRoute.post(
  "/register",
  Validation(insertUserSchema),
  authController.register,
);

// authRoute.post("/forget-password", authController.);
authRoute.post("/change-password", authController.changePassword);
