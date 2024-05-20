import email from "next-auth/providers/email";
import passage from "next-auth/providers/passage";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
