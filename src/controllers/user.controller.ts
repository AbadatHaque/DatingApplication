

//prismaAdapter

import { error } from "node:console";
import { prismaAdapter } from "../../lib/prismaAdapter.js";
import type { Request, Response } from "express";

export default class UserContriller {
    constructor(){

    }

    private onError=(req:Request,res:Response)=>{
      return   res.status(500).json({ success: false, message: "Failed to fetch users", });
    }

      getUsers = async (req:Request,res:Response) => {
        try{
          const  users =  await prismaAdapter.user.findMany()
            return res.status(200).json({
                 success: true, message: "Users fetched successfully", data: users, });
        }catch(error){
            console.error("getUsers error:", error); 
            return this.onError(req,res)
        }
    }

    insertUser=async(req:Request,res:Response)=>{
        try{
         const user =   await prismaAdapter.user.create(req.body)
         if(user){
            return res.sendStatus(201).json({
                message:"user has been crearted successfully",
            })
         }else{
            throw error()
         }
        }catch(error){
            return res.status(500).json({
                message:"There is an error ",
                error
            })
        }
    }
     
     removeUser=async (req:Request,res:Response)=>{
        try{
            const id = Number(req.params.id);
            const user = await prismaAdapter.user.delete({
                where:{id}
            })
            if(!user){
               return res.status(404).json({ message:"User not found"})
            }
            return res.status(200).json({
                message:"User Deleted successsfully"
            })
        }catch(error){
             console.error("getUsers error:", error); 
            return this.onError(req,res)
        }
    }
    


}