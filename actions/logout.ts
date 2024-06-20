"use server";

import { signOut } from "@/auth";
import { DEFAULT_SIGNOUT_REDIRECT } from "@/routes";

export const logout = async () => {
  //server stuff
  try {
    const result = await signOut({ redirectTo: DEFAULT_SIGNOUT_REDIRECT });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
