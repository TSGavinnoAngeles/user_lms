import React from "react";
import { auth, signOut } from "@/auth";

const LogoutBtn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="btn mx-5 outline outline-3 bg-mikado_yellow-500"
      >
        {" "}
        Logout
      </button>
    </form>
  );
};

export default LogoutBtn;
