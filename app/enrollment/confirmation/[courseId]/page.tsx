import React, { useEffect, useState } from "react";
import { get_One_Course } from "@/actions/courses";
import { searchStudent } from "@/actions/student";
import EnrollmentDetails from "@/app/components/CourseCaatComps/EnrollmentDetails";

const Editor = ({ params }: { params: { courseId: string } }) => {
  const handleEnrollment = () => {
    const student = searchStudent();
    console.log(student);
  };
  return (
    <div className="hero min-h-screen z-0 outline outline-1 bg-nyanza-400">
      <div>
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card w-100">
            <div className="card-body">
              <h2 className="text-5xl">Confirm Enrollment Details</h2>
              <EnrollmentDetails courseId={params.courseId} />

              <div className="justify-center flex flex-row py-6"></div>
              <div>
                <form>
                  <button className="btn bg-mikado_yellow-500 outline outline-2">
                    Lets do this!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
