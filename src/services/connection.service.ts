import { prismaAdapter } from "../lib/prismaAdapter.ts";

export async function findExistingRequest(fromId: number, toId: number) {
  try {
    const existingRequest = await prismaAdapter.requestConnection.findFirst({
      where: {
        OR: [
          { fromId, toId },
          { fromId: toId, toId: fromId },
        ],
      },
    });
    console.log(findExistingRequest, "findExistingRequest");
    return existingRequest;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}
