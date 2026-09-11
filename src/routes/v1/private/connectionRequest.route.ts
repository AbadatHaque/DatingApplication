// connect request
import Express from "express";
import { ConnectionController } from "../../../controllers/connectionRequest.controller.ts";

export const connectionRoute = Express.Router();

connectionRoute.get("sent", ConnectionController.getSentRequest); // how many connection i sent
connectionRoute.get("received", ConnectionController.getReceivedRequest); // how many connection i received
connectionRoute.get("/", ConnectionController.getConnetion); // get all the friend who can chat with me
connectionRoute.post(
  // sent like or dislike
  "/request/:status/:toId",
  ConnectionController.sentRequest,
);

connectionRoute.patch(
  // do rejected to accepted
  "/response/:status/:requestId",
  ConnectionController.ResponseResponse,
);
