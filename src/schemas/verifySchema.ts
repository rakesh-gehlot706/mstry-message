import {z} from "zod";

export const verifySchema = z.object({
     Code: z
    .string()
    .min(6,{message: "Verify code must be at least 6 characters"})
    .max(6,{message: "Verify code must be less than 6 characters"})
})