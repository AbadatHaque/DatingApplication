import { Router } from "express";
import { profileRoute } from "./profile.route.ts";
import { tokenValidation } from "../../../middleware/validation.ts";
import { connectionRoute } from "./connectionRequest.route.ts";

export const authenticateRoutes = Router();

authenticateRoutes.use(tokenValidation);
authenticateRoutes.use("/profile", profileRoute);
authenticateRoutes.use("/connection", connectionRoute);
