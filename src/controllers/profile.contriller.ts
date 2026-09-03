import { prismaAdapter } from "../lib/prismaAdapter.ts";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class Profile {
  private onError = (req: Request, res: Response) => {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch users" });
  };
  getUser = async (req: Request, res: Response) => {
    try {
    //   const token = req.cookies.token;
    //   const privateKey = process.env.privateJWTKey || "";
    //   var decoded = jwt.verify(token, privateKey);
    //   console.log(decoded, "token");
      res.status(204).json({
        message: "working on json",
      });
      // const user = prismaAdapter.user.findUnique({
      //     when
      // })
    } catch (error) {
      console.error("getUsers error:", error);
      return this.onError(req, res);
    }
  };
}
