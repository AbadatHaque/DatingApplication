
import {type Request,type Response } from "express"
import {Status} from "../../generated/prisma/enums.ts";
import { prismaAdapter } from "../lib/prismaAdapter.ts";
 class ConnectionRequestController{
    constructor(){
        this.request = this.request.bind(this)
    }

    async request(req: Request<{ status: Status; toId: string, }>, res:Response){
        try{
            const {status,toId} = req.params
            const fromId = Number(req.userId);
            prismaAdapter.requestConnection.create({
                data:{to_id:Number(toId),
                from_id:fromId,
                status},
            })
            res.status(200).json({
                message:"Successfully sent ",
            })
        }catch(error){
            res.status(500).json({
                message:"Something has error",
                error
            })
        }
    }

}
export const ConnectionController = new ConnectionRequestController();
