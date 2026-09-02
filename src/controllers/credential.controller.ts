import { Router, type Request, type Response } from "express";
import {
  getUserByEmail,
  getToken,
  setCookie,
  isMatchPassword,
} from "../services/index.js";
import { prismaAdapter } from "../lib/prismaAdapter.js";

class CredentialController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          message: "Credential was wrong",
        });
      }
      const isPasswordMatch = await isMatchPassword(password, user.password);
      if (!user || !isPasswordMatch) {
        return res.status(400).json({
          message: "Credential was wrong",
        });
      }
      const token = getToken(user.id);
      setCookie(res, token);
      res.status(200).json({
        message: "successfully login",
      });
    } catch (error) {
      res.status(500).json({
        message: "Encounter with unknow error",
        error: error,
      });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      await prismaAdapter.user.create(req.body);
      res.status(201).json({
        message: "successfull created account",
      });
    } catch (error) {
      res.status(500).json({
        message: "something error",
        error: error,
      });
    }
  };
}

export const authController = new CredentialController();
