import React from "react";
import { signIn } from "@/auth";

const GoogleLogin = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3 oultine outline-2"
      >
        Sign In Using your Google Account
      </button>
    </form>
  );
};

export default GoogleLogin;
