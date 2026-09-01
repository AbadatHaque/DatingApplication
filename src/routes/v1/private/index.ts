import { Router } from "express";
import { userRoutes } from "./user.route.js";

export const authenticateRoutes = Router();

authenticateRoutes.use("/users", userRoutes);
