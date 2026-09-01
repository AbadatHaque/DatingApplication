import {
  Router,
  type Router as routeType,
  type Request,
  type Response,
} from "express";
import UserContriller from "../../../controllers/user.controller.js";
import { Validation } from "../../../middleware/validation.js";
import { insertUserSchema, userIdSchame } from "../../../schema/user.schema.js";

export const userRoutes: routeType = Router();
const controller = new UserContriller();
userRoutes.get("/", controller.getUsers);
userRoutes.post("/", Validation(insertUserSchema), controller.insertUser);
userRoutes.delete("/:id", Validation(userIdSchame), controller.removeUser);

userRoutes.get("/:id", (req: Request, res: Response) => {
  return {
    version: "1",
    message: "get a single user details",
  };
});

userRoutes.patch("/:id", (req: Request, res: Response) => {
  return {
    version: "1",
    message: "updata the data with payload data ",
  };
});
userRoutes.delete("/:id", (req: Request, res: Response) => {
  return {
    version: "1",
    message: "delete the user which user id pass on params",
  };
});
