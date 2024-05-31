import React from "react";
import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 rounded-lg bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            E-mail: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
            >
              {" "}
              logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
