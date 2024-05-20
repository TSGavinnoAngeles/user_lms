"use client";

import Lottie from "lottie-react";
import React from "react";
import Spline from "@splinetool/react-spline";

const IntroHero = () => {
  return (
    <>
      <div
        className="hero min-h-[700px] glass bg-opacity-60 z-0 outline outline-1"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg')",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse px-2">
          <div className="card w-100 bg-nyanza-900">
            <div className="card-body">
              <h2 className="card-title text-5xl">Welcome to Seneca!</h2>
              <h2 className="card-title text-2xl">Where Logic meets Legacy</h2>
              <p>Search for a course fit just for you</p>
              <div className="justify-end flex flex-row ">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-full max-w-xs mr-2"
                />
                <button className="btn bg-mikado_yellow-500 outline outline-2">
                  Get Started!
                </button>
              </div>

              <a
                href="/login"
                className="font-underline  hover:text-mikado_yellow-500"
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
