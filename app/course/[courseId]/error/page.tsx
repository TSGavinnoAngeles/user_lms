import Navbar from "@/app/components/Dashboard/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div
        className="hero min-h-[653px] z-0 outline outline-1"
        style={{
          backgroundImage: "url('/Wallpapers/coldTurkey.png')",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card w-100 bg-nyanza-900">
            <div className="card-body">
              <h2 className="card-title text-5xl">
                WHOOPS THIS IS YET TO BE PUBLISHED
              </h2>
              <h2 className="card-title text-2xl">
                Take note of the ID! It might be available sometime soon
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
