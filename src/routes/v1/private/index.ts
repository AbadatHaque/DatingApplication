import { Router } from "express";
import { userRoutes } from "./user.route.ts";
import { profileRoute } from "./profile.route.ts";
import { tokenValidation } from "../../../middleware/validation.ts";

export const authenticateRoutes = Router();

authenticateRoutes.use(tokenValidation);
authenticateRoutes.use("/users", userRoutes);
authenticateRoutes.use("/profile", profileRoute);
