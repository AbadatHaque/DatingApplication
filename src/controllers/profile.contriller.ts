import { prismaAdapter } from "../lib/prismaAdapter.ts";
import { type Request, type Response } from "express";
import "dotenv/config";
import { getUserById } from "../services/user.service.ts";
import { userResponseSchema } from "../schema/index.ts";

export class Profile {
  constructor() {
    this.show = this.show.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }
  async show(req: Request, res: Response) {
    try {
      const id = Number(req.userId);
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //   const response = userResponseSchema.parse(user);
      return res.status(200).json({
        message: "User find successsfully",
        // user: response,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "I got error",
        error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.userId);
      await prismaAdapter.user.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json({
        message: "update successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "I got error",
        error,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.userId);
      await prismaAdapter.user.delete({
        where: { id },
      });
      res.json({
        message: "delete succesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "I got error",
        error,
      });
    }
  }
}
