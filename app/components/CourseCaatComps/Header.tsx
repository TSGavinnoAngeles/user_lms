import React from "react";
import { auth } from "@/auth";
const NameHeader = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <div className="p-5 card rounded-lg flex flex-col gap-1 my-6 shadow-md w-1/2 outline outline-1 ">
      <div className="flex flex-row justify-between ">
        <div>
          <a>
            <img
              src="/Wallpapers/coldTurkey.png"
              className="h-[100%] w-auto absolute right-10 top-0"
            />
          </a>
        </div>
      </div>
      <div className="card-title p-3 flex-row place-item-center">
        {" "}
        <p> Enroll in a Course</p>
      </div>
    </div>
  );
};

export default NameHeader;
