import { auth, signOut } from "@/auth";

import React from "react";
import Navbar from "../components/Dashboard/Navbar";
import Side from "../components/CourseCaatComps/Side";
import Course_Cat from "../components/CourseCaatComps/Course_Cat";
const courseCaat = async () => {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <>
      <Navbar />
      <div className="flex">
        <Side />
        <div className="shadow-lg p-8 rounded-lg bg-zinc-300/10 flex flex-col gap-2 my-6 place-item-center ml-64">
          <div>
            <span className="font-bold"> Welcome Back, {firstName}!</span>
          </div>
        </div>
      </div>
      Your Current Courses:
      <div className="shadow-inner  shadow-persian_blue-100 rounded-lg bg-zinc-300/10 place-item-center ml-64">
        <Course_Cat />
      </div>
    </>
  );
};

export default courseCaat;
