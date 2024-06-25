import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { LoginSchema } from "./app/schema";
import { InterfaceUser } from "./actions/login";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        const ValidatedFields = LoginSchema.safeParse(credentials);

        if (ValidatedFields.success) {
          const { email, password } = ValidatedFields.data;

          const body = { email: email, password: password };
          console.log(JSON.stringify(body));

          try {
            const res = await fetch(`https://user-lms.vercel.app/api/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });

            if (res.ok) {
              const json = (await res.json()) as InterfaceUser;
              return json;
            }
            if (!res.ok) {
              return null;
            }
          } catch (error) {
            console.log("CONFIG ERROR: ", error);
            return null;
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
