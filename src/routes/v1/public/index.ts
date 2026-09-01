import { Router } from "express";
import { authRoute } from "./auth.route.js";

export const publicRoutes = Router();

publicRoutes.use("/", authRoute);
