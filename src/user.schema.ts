import { email, z } from "zod";
export const insertUserSchema = z.object({
  body: z.object({
    email: email(),
    name: z.string().min(2).max(100),
    password: z.string().min(8),
    dob: z.coerce.date(),
  }),
});

export const userIdSchame = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});
