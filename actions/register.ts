"use server";
import * as z from "zod";
import { RegisterSchema } from "@/app/schema";
import User from "../models/user";
import validator from "validator";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/lib/db";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedForm = RegisterSchema.safeParse(values);
  if (!validatedForm.success) {
    console.log("Meh");
    return { error: "Invalidated Fields!" };
  }

  try {
    await connectToDB();

    const { name, email, password } = validatedForm.data;
    if (!name || !email || !password) {
      return { error: "Missing Field" };
    }
    const toLowerEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email });

    const toLowerUser = await User.findOne({ email: toLowerEmail });

    if (existingUser || toLowerUser) {
      return { error: "User already exists!" };
    } else if (!validator.isEmail(email)) {
      return {
        error:
          "Invalid Email detected make sure to have an @domain.com at the end",
      };
    } else if (!validator.isStrongPassword(password)) {
      return {
        error:
          "The password should at least have 6 letters, one number, one special character, and one Capital letter",
      };
    }
    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: toLowerEmail,
      password: hashedPass,
      role: "user",
      tier: "free",
    });

    return { message: "User registered." };
  } catch (error: any) {
    if (error) {
      return { error: error.message };
    }
  }
};
