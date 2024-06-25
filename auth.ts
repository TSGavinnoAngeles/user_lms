import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/lib/mongoAda";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt", maxAge: 5 },
  callbacks: {
    async signIn({ user }) {
      console.log("user", user);
      return true;
    },

    async jwt({ token }) {
      // console.log("JWT", token);
      return token;
    },

    async session({ session }: any) {
      // console.log("Sesh", session);
      return session;
    },
  },

  ...authConfig,
});
