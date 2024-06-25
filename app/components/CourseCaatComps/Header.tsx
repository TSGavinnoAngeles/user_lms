import React from "react";
import { auth } from "@/auth";

const NameHeader = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div className="p-5 card rounded-lg flex flex-col gap-1 my-6 shadow-inner w-full outline outline-1 items-center justify-center ">
      <div className="flex flex-row">
        <div></div>
      </div>
      <div className="card-title p-3 flex-row text-2xl ">
        <p> Everybody Starts Somewhere!</p>
      </div>
    </div>
  );
};

export default NameHeader;
