import { Router } from "express";
import { v1Routes } from "./v1/index.ts";
// import routes from "./src/routes/index";

export const routes = Router();

routes.use("/v1", v1Routes);
// routes.use("/v2", v1Routes)
