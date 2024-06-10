import React from "react";
import { signOut } from "@/auth";

const Logout = () => {
  const handleSignOut = async (e: any) => {
    e.preventDefault();
    ("use server");
    await signOut();
  };

  return (
    <form onSubmit={handleSignOut}>
      <button
        type="submit"
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>
    </form>
  );
};

export default Logout;
