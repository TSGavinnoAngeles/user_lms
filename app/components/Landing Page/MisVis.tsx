"use client";

import Lottie from "lottie-react";
import Money from "../../../public/money.json";
import Veri from "../../../public/veri.json";
import Ann from "../../../public/Ann.json";
import Lern from "../../../public/ler.json";
import React, { useRef } from "react";
const MisVis = () => {
  return (
    <div>
      <div className=" mt-40 min-w-[30%]  bg-nyanza-800 flex flex-row">
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <div className="card-body mx-5">
            <Lottie animationData={Money} />
            <h2 className="card-title">Easy Payment</h2>
            <p>With Stripe payments for courses are as easy as 1, 2, 3.</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <div className="card-body mx-5">
            <Lottie animationData={Veri} />
            <h2 className="card-title">Earn a badge!</h2>
            <p>Earn Badges as soon as you complete your courses.</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <div className="card-body mx-5">
            <Lottie animationData={Lern} />
            <h2 className="card-title">Announcements</h2>
            <p>Get an annoucment as soon as a new course has been put up!</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <div className="card-body mx-5">
            <Lottie animationData={Ann} />
            <h2 className="card-title">Learn</h2>
            <p>Choose from many of our available courses just for you.</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisVis;
