import React from "react";
import Side from "../components/Dashboard/Side";
import EnrolledCourses from "../components/CourseCaatComps/EnrolledCourses";
import NameHeader from "../components/Dashboard/NameHeader";
import TimeHeader from "../components/TimeHeader";
const Dashboard = async () => {
  return (
    <div className="min-h-screen">
      {" "}
      <div className="flex flex-col ">
        <TimeHeader />
        <div className="flex flex-row ml-5">
          <Side />

          <div className="mx-5 w-screen">
            <div className="flex flex-row ">
              <NameHeader />
            </div>

            <div className="  flex flex-col gap-2 my-6">
              <p className="font-bold text-xl"> Your Courses</p>
              <EnrolledCourses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
