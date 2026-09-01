import { prismaAdapter } from "../lib/prismaAdapter.js";

export const getUserById = async (id: number) => {
  try {
    const user = await prismaAdapter.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
