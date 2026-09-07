// connect request
import Express from "express";
import { ConnectionController } from "../../../controllers/connectionRequest.controller.ts";

export const connectionRoute = Express.Router();

connectionRoute.get("/request/:status/:toId", ConnectionController.request);
connectionRoute.post(
  "/response/:status/:requestId",
  ConnectionController.response,
);

// request/like/:id
// request/dislike/:id
// response/accept/:id
// response/reject/:id

// status - like , dislike
// accept, reject
