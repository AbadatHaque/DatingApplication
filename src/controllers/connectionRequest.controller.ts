import { type Request, type Response } from "express";
import { Status } from "../../generated/prisma/enums.ts";
import { prismaAdapter } from "../lib/prismaAdapter.ts";
import { findExistingRequest, getUserById } from "../services/index.ts";

const allowRequestStatus = [Status.like, Status.dislike] as const;
const allowResponseStatus = [Status.rejected, Status.accepted] as const;
type ResponseStatusType = (typeof allowResponseStatus)[number];
type RequestStatusType = (typeof allowRequestStatus)[number];

class ConnectionRequestController {
  constructor() {
    this.sentRequest = this.sentRequest.bind(this);
    this.response = this.response.bind(this);
  }
  async getRequest(
    req: Request<{
      status: RequestStatusType | ResponseStatusType;
      toId: string;
    }>,
    res: Response,
  ) {
    try {
      // who accepted,rejected me and  I like,dislike  -> from

      // who like,dislike me and I accepted,rejected - > toid
      let whereId = "",
        includeKey = "";
      const loginUserId = req.userId;
      const paeseLoginUserId = Number(loginUserId);
      const status: RequestStatusType | ResponseStatusType = req.params.status;
      if (allowRequestStatus.includes(status as RequestStatusType)) {
        whereId = "toId";
        includeKey = "from";
      } else if (allowResponseStatus.includes(status as ResponseStatusType)) {
        whereId = "fromId";
        includeKey = "to";
      }
      if (!whereId) {
        // status is not valid
        return res.status(400).json({
          message: "Status is not valid",
        });
      }
      console.log(status, whereId);
      const data = await prismaAdapter.requestConnection.findMany({
        where: { [whereId]: paeseLoginUserId, status },
        include: { [includeKey]: true },
      });
      return res.status(200).json({
        message: "Successfully fetch data ",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
  async sentRequest(
    req: Request<{ status: RequestStatusType; toId: string }>,
    res: Response,
  ) {
    try {
      const { status, toId } = req.params;
      const fromId = req.userId;
      const parsedToId: number = Number(toId);
      const parsedFromId = Number(fromId);
      // 1. check status in valid
      // 2. users ids not present
      // 3. toId is valid user
      // 4. from user not equal to toId
      if (parsedToId === parsedFromId) {
        return res.status(404).json({
          message: "you can not request yourself",
        });
      }
      if (!allowRequestStatus.includes(status)) {
        return res.status(404).json({
          message: "Status is not valid",
        });
      }
      const toUser = await getUserById(parsedToId);
      if (!toUser) {
        return res.status(404).json({
          message: "toUseriD not valid",
        });
      }
      const existingRequest = await findExistingRequest(
        parsedToId,
        parsedFromId,
      );
      if (existingRequest) {
        return res.status(404).json({
          message: "This is existing request",
        });
      }
      const data = await prismaAdapter.requestConnection.create({
        data: {
          toId: parsedToId as number,
          fromId: parsedFromId as number,
          status,
        },
      });
      return res.status(201).json({
        message: "Request sent successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something has error",
        error,
      });
    }
  }
  async response(
    req: Request<{ status: ResponseStatusType; requestId: string }>,
    res: Response,
  ) {
    try {
      const { status, requestId } = req.params;
      const loginUserId = req.userId;
      const paeseLoginUserId: number = Number(loginUserId);
      const parsedRequestId: number = Number(requestId);

      /// parsedRequestId is valid
      // 2. currnt status is like
      // 3. status valid
      if (!allowResponseStatus.includes(status)) {
        return res.status(404).json({
          message: "Status is not valid",
        });
      }
      const connectionData =
        await prismaAdapter.requestConnection.findFirstOrThrow({
          where: {
            id: parsedRequestId,
          },
        });
      if (!connectionData) {
        return res.status(400).json({
          message: "Wrong request id",
        });
      }
      if (connectionData.status !== "like") {
        return res
          .status(400)
          .json({ message: "You can not response to this request" });
      }

      const result = await prismaAdapter.requestConnection.update({
        where: { id: parsedRequestId },
        data: {
          status,
        },
      });
      return res.status(201).json({
        message: "Status has been change successfully",
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

// ✅ 2xx Success200 OK: The standard success code. Your request worked, and the data is here.
// 201 Created: Success! A new record was successfully created (perfect for when a user successfully submits a new connection request).
// 🔀 3xx Redirection301 Moved Permanently: The webpage has a brand new web address forever.
// 304 Not Modified: Nothing has changed since you last looked. Use your saved cache version to save speed.❌
// 4xx Client Errors (Your code or user input is wrong)
// 400 Bad Request: The server cannot understand your request (e.g., missing data or bad syntax).
// 401 Unauthorized: You aren't logged in. You need credentials to see this.403 Forbidden: You are logged in, but you don't have permission to see this specific data.
// 404 Not Found: The classic error. The page, route, or database record does not exist.💥
//  5xx Server Errors (Your backend server crashed)
// 500 Internal Server Error: A generic catch-all crash code. Usually means your backend Node.js/Prisma code threw an unhandled exception or error.
// 503 Service Unavailable: The server is overloaded or down for maintenance.
