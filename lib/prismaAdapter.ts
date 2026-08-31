import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "prisma/config";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: env("DATABASE_HOST"),
  port: Number(env("DATABASE_PORT")),
  user: env("DATABASE_USER"),
  password: env("DATABASE_PASSWORD"),
  database: env("DATABASE_NAME"),
});

const prismaAdapter = new PrismaClient({
  adapter,
});

export { prismaAdapter };