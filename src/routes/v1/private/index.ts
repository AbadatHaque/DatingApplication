import { Router } from "express";
import { profileRoute } from "./profile.route.ts";
import { tokenValidation } from "../../../middleware/validation.ts";

export const authenticateRoutes = Router();

authenticateRoutes.use(tokenValidation);
authenticateRoutes.use("/profile", profileRoute);
