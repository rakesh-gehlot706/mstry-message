import {z} from "zod";

export const signInSchema = z.object({
     identifier: z.string(),  // identifier = username just same thing u shoud also use "username"
     password: z.string(),
})