import React from "react";
import Side from "../components/Dashboard/Side";
import Course_Cat from "../components/CourseCaatComps/Course_Cat";
import TimeHeader from "../components/TimeHeader";

import Header from "../components/CourseCaatComps/Header";
const courseCaat = () => {
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
              </div>{" "}
              <p className="font-bold text-3xl"> Explore the catalog </p>
              <div className="  flex flex-col gap-2 my-6">
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
