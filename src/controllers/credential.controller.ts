import { Router, type Request, type Response } from "express";
import {
  getUserByEmail,
  getToken,
  setCookie,
  isMatchPassword,
  distroyCookie,
} from "../services/index.ts";
import { prismaAdapter } from "../lib/prismaAdapter.ts";
import bcrypt from "bcrypt";

class CredentialController {
  private saltRounds = 10;
  login = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      const isPasswordMatch = await isMatchPassword(password, user?.password);
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
      const { password, email, name, dob, ...rest } = req.body;
      const encodePassword = await bcrypt.hash(password, this.saltRounds);
      const user = await prismaAdapter.user.create({
        data: {
          email,
          name,
          password: encodePassword,
          dob: new Date(dob),
        },
      });
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

  logOut = async (req: Request, res: Response) => {
    try {
      distroyCookie(res);
      res.status(200).json({
        message: "Successfully logout",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(String(error));
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { email, password, newPassword } = req.body;
      const user = await getUserByEmail(email);
      const isPasswordMatch = await isMatchPassword(password, user?.password);
      if (!user || !isPasswordMatch) {
        return res.status(400).json({
          message: "Incurrect infomation was provided",
        });
      }
      const userId = user.id;
      const encodePassword = await bcrypt.hash(newPassword, this.saltRounds);
      await prismaAdapter.user.update({
        where: { id: userId },
        data: {
          password: encodePassword,
        },
      });
      res.status(200).json({
        message: "Password changed succesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something has error",
        error: error,
      });
    }
  };

  forgetPassword = async (req: Request, res: Response) => {
    try {
      // we will implemant in later
      const { email } = req.body;
      const user = await getUserByEmail(email);
    } catch (error) {}
  };
}

export const authController = new CredentialController();
