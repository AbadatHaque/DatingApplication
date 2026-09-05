import jwt from "jsonwebtoken";
import { env } from "prisma/config";
import type { Response } from "express";
import bcrypt from "bcrypt";

export function getToken(id: number) {
  const privateKey = env("privateJWTKey");
  const token = jwt.sign(
    {
      id,
    },
    privateKey,
    { expiresIn: "1h" },
  );
  return token;
}

export function setCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in HTTPS production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
}

export async function isMatchPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, passwordHash);

    return isMatch;
  } catch (error) {
    return false;
  }
}
interface JwtUserPayload extends jwt.JwtPayload {
  id: number;
}
export async function checkTokenValid(token: string) {
  try {
    console.log("run chackToken");
    const privateKey = process.env.privateJWTKey || "";
    const decoded = await jwt.verify(token, privateKey) as JwtUserPayload;
    return decoded;
  } catch (error) {
    throw new Error();
  }
}
