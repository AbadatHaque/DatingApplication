// connect request
import Express from "express";
import { ConnectionController } from "../../../controllers/connectionRequest.controller.ts";

export const connectionRoute = Express.Router();

connectionRoute.post(
  "/request/:status/:toId",
  ConnectionController.sentRequest,
);
// To see all the list of user who like me

// to see all the user who reject me or accept me
connectionRoute.patch(
  "/response/:status/:requestId",
  ConnectionController.response,
);

// who accepted,rejected,like,dislike me
// I accepted,rejected,like,dislike

// who accepted,rejected me and  I like,dislike  -> from

// who like,dislike me and I accepted,rejected - > toid




connectionRoute.get("/request/:status", ConnectionController.getRequest);

// request/like/:id
// request/dislike/:id
// response/accept/:id
// response/reject/:id

// status - like , dislike
// accept, reject
