import { type Request, type Response } from "express";
import { Status } from "../../generated/prisma/enums.ts";
import { prismaAdapter } from "../lib/prismaAdapter.ts";
import { findExistingRequest } from "../services/index.ts";

type ResponseStatus = Extract<Status, "ACCEPT" | "REJECT">;
type RequestStatus = Extract<Status, "LIKE" | "DISLIKE">;

class ConnectionRequestController {
  constructor() {
    this.request = this.request.bind(this);
  }

  async validation(
    req: Request<{ status: Status; toId: string }>,
    res: Response,
  ) {
    try {
      const { status, toId } = req.params;
      if (!req.userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const fromId = req.userId;
      const parsedToId = Number(toId);

      if (Number.isNaN(parsedToId)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }

      // User cannot send request to himself
      if (parsedToId === fromId) {
        return res.status(400).json({
          message: "You cannot send a request to yourself",
        });
      }

      // Check A -> B OR B -> A
      const existingRequest = await findExistingRequest(parsedToId, fromId);
      if (existingRequest) {
        return res.status(400).json({
          message: "You cannot send a request because a request already exists",
        });
      }
      if (!Object.values(Status).includes(status as Status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something has error",
      });
    }
  }

  async request(
    req: Request<{ status: RequestStatus; toId: string }>,
    res: Response,
  ) {
    try {
      const { status, toId } = req.params;
      const fromId = req.userId;
      const parsedToId: number = Number(toId);
      await this.validation(req, res);
      await prismaAdapter.requestConnection.create({
        data: {
          to_id: parsedToId as number,
          from_id: fromId as number,
          status,
        },
      });
      return res.status(201).json({
        message: "Request sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something has error",
        error,
      });
    }
  }
  async response(
    req: Request<{ status: ResponseStatus; requestId: string }>,
    res: Response,
  ) {
    try {
      const { status, requestId } = req.params;
      const loginUserId = req.userId;
      const paeseLoginUserId: number = Number(loginUserId);
      const parsedRequestId: number = Number(requestId);
      const user = await prismaAdapter.requestConnection.findFirstOrThrow({
        where: { id: parsedRequestId },
      });
      if (user.to_id !== paeseLoginUserId) {
        res.status(400).json({
          message: "You can not change the password",
        });
      }
      const result = await prismaAdapter.requestConnection.update({
        where: { id: parsedRequestId, status: "LIKE" },
        data: {
          status,
        },
      });
      if (!result) {
        throw new Error(
          "Request does not exist or it's current status is not" + { status },
        );
      }
      return res.status(201).json({
        message: "Request sent successfully",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "message invalid",
        error,
      });
    }
  }
}
export const ConnectionController = new ConnectionRequestController();
