import { prismaAdapter } from "../lib/prismaAdapter.ts";

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

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaAdapter.user.findUnique({
      where: { email },
    });
    console.log(user, email, "user query");
    return user;
  } catch (error) {
    throw error;
  }
};
