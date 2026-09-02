import { Router } from "express";
import { authRoute } from "./auth.route.ts";

export const publicRoutes = Router();

publicRoutes.use("/", authRoute);
