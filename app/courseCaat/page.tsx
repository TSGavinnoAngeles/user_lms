import React from "react";
import Side from "../components/Dashboard/Side";
import Course_Cat from "../components/CourseCaatComps/Course_Cat";
import TimeHeader from "../components/TimeHeader";

import Header from "../components/CourseCaatComps/Header";
const courseCaat = async () => {
  return (
    <>
      <div className="min-h-screen">
        {" "}
        <div className="flex flex-col ">
          <TimeHeader />
          <div className="flex flex-row ml-5">
            <Side />

            <div className="mx-5 w-screen">
              <div className="flex flex-row ">
                <Header />
              </div>

              <div className="  flex flex-col gap-2 my-6">
                <p className="font-bold text-xl"> </p>
                <Course_Cat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default courseCaat;
