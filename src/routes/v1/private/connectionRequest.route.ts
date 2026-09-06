
// connect request
import  Express  from "express"
import { ConnectionController } from "../../../controllers/connectionRequest.controller.ts"

const connectionRoute = Express.Router()

connectionRoute.get('/request/:status/:toId', ConnectionController.request)
connectionRoute.get('/response/:status/:toId', ConnectionController.request)



// request/like/:id
// request/dislike/:id
// response/accept/:id
// response/reject/:id

// status - like , dislike
// accept, reject 



