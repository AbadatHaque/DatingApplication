import { userService } from "../services/user.service.js";
import type { Response, request } from "express";
import { defineConfig,env } from "prisma/config";
import jwt from "jsonwebtoken"


class CredentialController{

    login=async (req:Request,res:Response)=>{
        try{
        const {id,password} = req.body;
            const user = userService.getUserById(id);
            if(!user){
                return res.status(404).json({
                    message:"Credential was wrong."
                })
            }

             const token = req.cookies.token;
               if (!token) {
                return res.status(401).json({
                message: "Token not found",
                });
            }

            const  privateKey = env("privateJWTKey")
            const  decoded = jwt.verify(token, privateKey);


            
        }catch(error){

        }
  
    }
}