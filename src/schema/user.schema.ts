import { email, z } from "zod";
import {
  Gender,
  AreaType,
  OccupationType,
  MarriageTimeline,
} from "../../generated/prisma/enums.ts";

const userFields = {
  name: z.string().min(2).max(100),
  dob: z.coerce.date(),
  gender: z.enum(Gender).optional(),
  lookingFor: z.string().min(100).max(500),
  about: z.string().min(100).max(500),
  areaType: z.enum(AreaType).optional(),
  occupation: z.string(),
  occupationType: z.enum(OccupationType).optional(),
  higherEducation: z.string(),
  mobileNumber: z.string(),
  marriageTimeline: z.enum(MarriageTimeline).optional(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  password:z.string(),
  email: email(),
  id:z.number(),
  createdAt:z.coerce.date(),
  updatedAt:z.coerce.date(),
};
export const insertUserSchema =z.object({body:z.object(userFields).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}) })

export const updateUserSchema = z.object({
  body:z.object(userFields).omit({
    password:true, createdAt:true,updatedAt:true,id:true,email:true
  })
})

export const userResponseSchema = z.object(userFields).omit({
     password:true
})

//extend