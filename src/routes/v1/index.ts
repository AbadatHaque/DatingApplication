import { Router } from "express";
import { authenticateRoutes } from "./private/index.js";
import { publicRoutes } from "./public/index.js";

export const v1Routes = Router();

v1Routes.use("/admin", authenticateRoutes);
v1Routes.use("/public", publicRoutes);
