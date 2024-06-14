import React from "react";
import { auth, signOut } from "@/auth";
import { delStudent } from "@/actions/student";
import Delete from "../components/Settings Page/Delete";

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
          <div className="flex flex-row gap-5">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <div className="justify-between">
                <button
                  type="submit"
                  className="btn bg-mikado_yellow-500 outline outline-2 "
                >
                  {" "}
                  Logout
                </button>
              </div>
            </form>
            <Delete />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
