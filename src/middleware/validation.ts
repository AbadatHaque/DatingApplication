import type { NextFunction,Request,Response } from "express";
import  {z,type ZodType } from "zod";

export function Validation (schema:ZodType){
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = schema.parse({
                body:req.body,
                params:req.params,
                query:req.query
            })
    //        req.body = result.body;
    //   req.params = result.params;
    //   req.query = result.query;
            next()
        }catch(error){
            if( error instanceof z.ZodError){
                return res.status(400).json({
                    message:"validation error",
                    errors:error.issues
                })
            }
             next(error)
             
        }
    }
}