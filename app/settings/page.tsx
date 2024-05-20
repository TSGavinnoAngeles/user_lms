import React from "react";
import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <>
      <div>
        <h1>User Logged in is: {session?.user?.name}</h1>
        <p>Email: {session?.user?.email}</p>
        <p>Email: {String(session?.expires)}</p>
        <div>{JSON.stringify(session)}</div>;
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default SettingsPage;
