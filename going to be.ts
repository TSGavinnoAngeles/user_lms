import React from "react";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import User from "./app/models/user";
// import { auth } from "./app/lib/auth";

const { auth } = NextAuth(authConfig);

export const middleware = auth;
export default auth((req) => {
  // req.auth
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
