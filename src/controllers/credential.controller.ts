import { Router, type Request, type Response } from "express";
import {
  getUserByEmail,
  getToken,
  setCookie,
  isMatchPassword,
} from "../services/index.ts";
import { prismaAdapter } from "../lib/prismaAdapter.ts";
import bcrypt from "bcrypt";

class CredentialController {
  login = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
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
      console.log(error);
      res.status(500).json({
        message: "Encounter with unknow error",
        error: error,
      });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      console.log("entry register");
      const { password, email, name, dob, ...rest } = req.body;
      const saltRounds = 10;
      const encodePassword = await bcrypt.hash(password, saltRounds);
      console.log("encodePassword register", encodePassword);

      prismaAdapter.user.create({
        data: {
          email,
          name,
          password: encodePassword,
          dob,
        },
      });
      console.log("user register");
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
