// connect request
import Express from "express";
import { ConnectionController } from "../../../controllers/connectionRequest.controller.ts";

export const connectionRoute = Express.Router();

connectionRoute.post("/request/:status/:toId", ConnectionController.sentRequest);
// To see all the list of user who like me 


// to see all the user who reject me or accept me 
connectionRoute.patch(
  "/response/:status/:requestId",
  ConnectionController.response,
);

// request/like/:id
// request/dislike/:id
// response/accept/:id
// response/reject/:id

// status - like , dislike
// accept, reject
