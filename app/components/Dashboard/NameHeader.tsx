import React from "react";
import ShowDate from "./ShowDate";
import { auth } from "@/auth";
import Image from "next/image"; // Import the Image component from the correct package

const NameHeader = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <div className="p-5 card rounded-lg flex flex-col gap-1 my-6 shadow-md w-3/5 outline outline-1 ">
      <div className="flex flex-row justify-between ">
        <div>
          <a>
            <Image
              alt="Cold Turkey"
              src="/Wallpapers/coldTurkey.png"
              className="h-[100%] w-auto absolute right-0 top-0"
              width={100} // Add the necessary props to the Image component
              height={100} // Add the necessary props to the Image component
            />
          </a>
        </div>
      </div>
      <div className="card-title p-3 flex-row place-item-center">
        {" "}
        <p> Hello {firstName}! I hope you are having a wonderful day </p>
      </div>
    </div>
  );
};

export default NameHeader;
