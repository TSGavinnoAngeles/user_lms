"use server";
import * as z from "zod";
import { LoginSchema } from "@/app/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export interface InterfaceUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedForm = LoginSchema.safeParse(values);

  if (!validatedForm.success) {
    console.log("Meh");
    return { error: "Invalidated Fields!" };
  }

  const { email, password } = validatedForm.data;

  const toLowerCaseEmail = email.toLowerCase();

  try {
    await signIn("credentials", {
      email: toLowerCaseEmail,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { message: "Logged in" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "An error occurred" };
      }
    }

    throw err;
  }
};
