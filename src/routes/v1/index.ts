import { Router } from "express";
import { authenticateRoutes } from "./private/index.ts";
import { publicRoutes } from "./public/index.ts";

export const v1Routes = Router();

v1Routes.use("/admin", authenticateRoutes);
v1Routes.use("/public", publicRoutes);
