import { Router, type Router as routeType } from "express";
import { Profile } from "../../../controllers/profile.contriller.ts";
import { Validation } from "../../../middleware/validation.ts";
import { updateUserSchema } from "../../../schema/index.ts";

export const profileRoute: routeType = Router();
const ProfileContriller = new Profile();

profileRoute.get("/view", ProfileContriller.show);
profileRoute.patch("/edit",Validation(updateUserSchema), ProfileContriller.update);
profileRoute.delete("/delete", ProfileContriller.destroy);

