import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/lib/mongoAda";
import { revalidatePath } from "next/cache";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt", maxAge: 5 },
  callbacks: {
    async signIn({ user }) {
      console.log("user", user);
      return true;
    },

    async jwt({ token, account }) {
      // if (account) {
      //   console.log(account.provider);
      // } else {
      //   console.log("no account");
      // }
      // console.log({ token });
      return token;
    },

    // async session({ session }: any) {
    //   console.log(session.provider);
    //   return session;
    // },
  },

  ...authConfig,
});
