import { Router } from "express";
import { userRoutes } from "./user.route.ts";

export const authenticateRoutes = Router();

authenticateRoutes.use("/users", userRoutes);
