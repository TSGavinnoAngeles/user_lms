"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Side = () => {
  const router = useRouter();
  return (
    <div className=" fixed min-h-screen bg-nyanza-900  rounded--xl z-50">
      <div className="ml-5 pt-5">
        <div className="flex flex-col">
          <ul className="menu bg-beutral-50 w-56 rounded-box space-y-1 font-bold text-xl">
            {" "}
            <li>
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => {
                    router.push("/courseCaat");
                  }}
                  className=" rounded-none "
                >
                  {" "}
                  Course Catalog
                </button>
              </div>
            </li>
            <div className="divider"></div>
            <li>
              <div className="flex flex-row space-x-2">
                <button className=" rounded-none"> My Dashboard </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Side;
