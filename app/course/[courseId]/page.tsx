"use client";
import React, { useEffect, useState } from "react";
import { get_One_Course } from "@/actions/courses";
import { Course } from "@/actions/courses";
import Navbar from "@/app/components/Dashboard/Navbar";
import EnrollmentModal from "@/app/components/Modals/EnrollmentModal";
import UnenrollmentModal from "@/app/components/Modals/UnenrollmentModal";
import { get_Enrollments } from "@/actions/enroll";
import { redirect } from "next/navigation";
import Preview from "@/app/components/Course/Preview";
import { getUserSub, Student } from "@/actions/student";

const Editor = ({ params }: { params: { courseId: string } }) => {
  const [courses, setCourses] = useState<Course>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStudent, setIsStudent] = useState<Student>();

  const fetchCourses = async () => {
    const result = await get_One_Course(params.courseId);
    if (result.error) {
      console.error(result.error);
    } else {
      setCourses(result);
      setIsLoading(false);
    }
  };

  const isStudentEnrolled = async () => {
    const enrollments = await get_Enrollments(params.courseId);
    if (enrollments) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false);
    }
  };
  const tier = async () => {
    const result = await getUserSub();
    setIsStudent(result);
    console.log(result);
  };

  useEffect(() => {
    fetchCourses();
    isStudentEnrolled();
    tier();
  }, [params.courseId, isOpen]);

  useEffect(() => {
    if (!isLoading && courses?.status !== "Published") {
      redirect(`/course/${params?.courseId}/error`);
    }
    if (isStudent?.tier === "free" && courses?.sub_Mode === "Paid") {
      redirect(`/pricing`);
    }
  }, [isLoading, courses]);

  return (
    <div>
      <Navbar />
      <div
        className="hero min-h-[700px] z-0 outline outline-1 overflow-hidden bg-cover bg-center bg-no-repeat bg-opacity-90"
        style={{
          backgroundImage: "url('/Wallpapers/blueCitypop.png')",
        }}
      >
        <div className="hero-content flex-row lg:flex-row-reverse">
          <div className="card w-100 bg-citypop-200 outline outline-2 bg-opacity-95  shadow-[10px_10px_0_0_]">
            <div className="border-b-2 bg-citypop-300 h-6 flex flex-row-reverse  ">
              <button className="border-2 bg-citypop-400 w-7 m-2 rounded-full  ">
                {" "}
              </button>
              <button className="border-2 bg-citypop-600 w-7 m-2 rounded-full ">
                {" "}
              </button>
            </div>
            <div className="card-body min-w-full">
              <h2 className="card-title text-5xl">{courses?.name}</h2>
              <h1 className="card-title "> Course Id: {courses?.courseId}</h1>
              <h2 className="card-title ">
                Published by: {courses?.publisher.name}
              </h2>

              <div className="justify-start flex flex-row py-6"></div>
              <div>
                {isEnrolled ? (
                  <div className="space-x-24">
                    <div className="py-1 rounded-sm outline outline-2  bg-bittersweet_shimmer grid place-content-center ">
                      <button
                        onClick={() => setIsOpen(true)}
                        className=" text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
                      >
                        Would You like to unenroll?
                      </button>
                      <UnenrollmentModal
                        courseId={params.courseId}
                        name={courses?.name || "--"}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-1 rounded-sm outline outline-2 bg-mikado_yellow-600 grid place-content-center ">
                    <button
                      onClick={() => setIsOpen(true)}
                      className=" text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
                    >
                      Enroll Into {courses?.name}
                    </button>
                    <EnrollmentModal
                      courseId={params.courseId}
                      name={courses?.name || "--"}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-5 card rounded-sm min-w-100 bg-citypop-200 outline outline-2 bottom-14 min-h-auto font-bold">
          {courses?.name} Syllabus
          <p className="text-xl mx-5 mt-2">
            {" "}
            Contains: 3 units - 4 lessons - 5 projects{" "}
          </p>
        </div>
      </div>

      <Preview courseId={params.courseId} name={courses?.name || "--"} />
    </div>
  );
};

export default Editor;
