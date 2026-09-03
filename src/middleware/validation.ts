import type { NextFunction, Request, Response } from "express";
import { z, type ZodType } from "zod";
import { checkTokenValid } from "../services/index.ts";

type ValidationInput = {
  body?: unknown;
  params?: Request["params"];
  query?: Request["query"];
};

type ValidationOutput = {
  body?: unknown;
  params?: Request["params"];
  query?: Request["query"];
};

export function Validation<T extends ValidationOutput>(
  schema: ZodType<T, ValidationInput>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("0nd");

      const result = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      console.log("1nd");

      //   req.body = result?.body ?? req.body;
      //   req.params = result?.params ?? req.params;
      //   req.query = result?.query ?? req.query;
      console.log("2nd");
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "validation error",
          errors: error.issues,
        });
      }

      return next(error);
    }
  };
}

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.token;
    const decoded =  checkTokenValid(token);
    if (!decoded) {
      return res.status(400).json({
        message: "token not valid",
      });
    }
    req.userId = decoded.id;
    return next();
  } catch (err) {
    res.status(500).json({
      message: "something has error",
      error: err,
    });
  }
}
