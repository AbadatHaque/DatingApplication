import { Router, type Router as routeType } from "express";
import { Profile } from "../../../controllers/profile.contriller.ts";

export const profileRoute: routeType = Router();
const ProfileContriller = new Profile();

profileRoute.get("/", ProfileContriller.get);
// pro fileRoute.post("/");
// profileRoute.delete("/");
