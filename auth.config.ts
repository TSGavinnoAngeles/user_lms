import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { LoginSchema } from "./app/schema";
import { connectToDB } from "./app/lib/db";
import bcrypt from "bcryptjs";
import User from "./models/user";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        const ValidatedFields = LoginSchema.safeParse(credentials);

        if (ValidatedFields.success) {
          const { email, password } = ValidatedFields.data;
          await connectToDB();
          try {
            const user = await User.findOne({ email });

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!user) {
              // return { error: "User not found" };
              console.log("User not found");
              return null; // Add a return statement here to exit the function if user is null
            }

            if (!passwordMatch) {
              // return { error: "Invalid password" };
              console.log("Invalid password");
              return null;
            } else {
              console.log("Logged in successfully", user);

              return user;
            }
          } catch (err) {
            console.error("Error in Login: " + err);
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
