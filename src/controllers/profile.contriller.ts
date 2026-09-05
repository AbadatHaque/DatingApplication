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
  get = async (req: Request, res: Response) => {
    try {
        const id = Number(req.userId);
        console.log(id,req.userId, "id")
      const user = await prismaAdapter.user.findFirst({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "User find successsfully",
        user
      });
    } catch (error) {
      console.error("getUsers error:", error);
      return this.onError(req, res);
    }
  };
}
