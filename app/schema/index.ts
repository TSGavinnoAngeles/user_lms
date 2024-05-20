import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),

  name: z.string().min(1, {
    message: "First and Lastname is required",
  }),
});
