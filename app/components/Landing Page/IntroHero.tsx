"use client";

import Lottie from "lottie-react";
import React from "react";
import Spline from "@splinetool/react-spline";

const IntroHero = () => {
  return (
    <>
      <div
        className="hero min-h-screen glass z-0 outline outline-1"
        style={{
          backgroundImage: "url('/Wallpapers/citypop.jpg')",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse px-2">
          <div className="card w-100 bg-citypop-200 outline outline-2 bg-opacity-95  shadow-persian_blue-500 shadow-2xl">
            <div className="border-b-2 bg-citypop-300 h-6 flex flex-row-reverse ">
              <button className="border-2 bg-citypop-400 w-7 m-2 rounded-full  ">
                {" "}
              </button>
              <button className="border-2 bg-citypop-600 w-7 m-2 rounded-full">
                {" "}
              </button>
            </div>
            <div className="card-body ">
              <h2 className="card-title text-5xl">Welcome to Seneca!</h2>
              <h2 className="card-title text-2xl">Where Logic meets Legacy</h2>
              <p>Search for a course fit just for you</p>
              <div className=" flex flex-row space-x-10 ">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-full max-w-xs bg-opacity-50 bg-citypop-300"
                />
                <button className="btn bg-bittersweet_shimmer-700 outline outline-2 ">
                  Get Started!
                </button>
              </div>

              <a
                href="/login"
                className="font-underline  hover:text-citypop-500"
              >
                {" "}
                Explore All Courses{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroHero;
