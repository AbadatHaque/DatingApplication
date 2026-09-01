import { Router } from "express";
import { authController } from "../../../controllers/credential.controller.js";
import { Validation } from "../../../middleware/validation.js";
import { insertUserSchema } from "../../../schema/user.schema.js";
const route = Router();

route.post("/login", authController.login);

route.post("/register", Validation(insertUserSchema), authController.register);
