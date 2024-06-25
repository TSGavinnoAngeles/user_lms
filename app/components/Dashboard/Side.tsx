"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Side = () => {
  const router = useRouter();

  return (
    <div className="w-1/6 h-2/3 rounded-xl flex flex-col justify-between">
      <div className="">
        <div className="flex flex-col">
          <a className="btn btn-ghost">
            <img
              onClick={() => router.push("/dashboard")}
              src="/Logo/logo2.png "
              className="w-auto h-[125%]"
            />
          </a>
          <div className="divider"></div>
          <ul className="menu rounded-box space-y-5 font-bold text-xl place-items-start tooltip">
            {" "}
            <li>
              <button
                onClick={() => {
                  router.push("/catalog");
                }}
                className=" w-full"
              >
                {" "}
                More Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push("/catalog");
                }}
                className=" w-full"
              >
                {" "}
                Pricing
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <a
          href="/settings"
          className="btn btn-ghost m-10 outline outline-5 bg-opacity-50 bg-base-100 hover:bg-opacity-100 hover:bg-base-100 hover:text-white shadow-lg shadow-persian_blue-500"
        >
          Account Settings
        </a>
      </div>
    </div>
  );
};

export default Side;
