"use client";

import React, { useEffect, useState } from "react";
import { get_One_Course } from "@/actions/courses";
import { Course } from "@/actions/courses";
import Navbar from "@/app/components/Dashboard/Navbar";
import EnrollmentModal from "@/app/components/Modals/EnrollmentModal";
import UnenrollmentModal from "@/app/components/Modals/UnenrollmentModal";
import { get_Enrollments } from "@/actions/enroll";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import SpringModal from "@/app/components/Modals/DelModal";

const Editor = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await get_One_Course(params.courseId);
      if (result.error) {
        console.error(result.error);
      } else {
        setCourses(result);
        setIsLoading(false); // Update loading state when data is fetched
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

    fetchCourses();
    isStudentEnrolled();
  }, [params.courseId, isOpen]);

  useEffect(() => {
    if (!isLoading && courses?.status !== "Published") {
      redirect(`/course/${params?.courseId}/error`);
    }
  }, [isLoading, courses]);

  return (
    <div>
      <Navbar />
      <div
        className="hero min-h-[700px] z-0 outline outline-1"
        style={{
          backgroundImage: "url('/Wallpapers/blueCitypop.png')",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse  ">
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
              <h1 className="card-title text-5xl">
                {" "}
                Course Id: {courses?.courseId}
              </h1>
              <h2 className="card-title text-2xl">
                Publihed by: {courses?.publisher.name}
              </h2>
              <p>{courses?.description}</p>
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

      <div className="grid place-items-center bg-nyanza-800 text-3xl py-9 min-w-screen space-y-1">
        <div className="collapse bg-nyanza-800 max-w-[75%] outline outline-2 p-1 ">
          <div className="collapse-title text-3xl font-semibold">
            {courses?.name} Syllabus
            <p className="text-xl mx-5 mt-2">
              {" "}
              Contains: 3 units - 4 lessons - 5 projects{" "}
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-nyanza-800 max-w-[75%] outline outline-2 ">
          <input type="checkbox" />
          <div className="flex flex-row collapse-title text-3xl font-semibold justify-between">
            <div> Module 1: Introduction to {courses?.name} </div>
          </div>
          <div className="collapse-content text-xl">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit
              amet nulla et metus blandit lobortis sed vitae eros. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Etiam placerat eros turpis, nec vehicula dolor
              malesuada gravida. Cras vulputate bibendum purus, a porttitor odio
              egestas quis. Nunc placerat justo scelerisque velit tincidunt
              sollicitudin. Vestibulum eu aliquet leo. Curabitur odio quam,
              dignissim quis nisl id, tempor dignissim odio. Nunc sodales, lacus
              non molestie pellentesque, neque arcu pellentesque dui, et
              pharetra quam turpis ut augue. Sed pretium, eros nec finibus
              fringilla, velit lacus bibendum diam, nec dictum massa nunc at
              tortor. Vivamus sed auctor est. Morbi nec viverra nibh, vel
              pellentesque orci. Mauris sed vulputate mauris. Sed ullamcorper
              erat metus, ac pellentesque felis condimentum ac.
            </p>
          </div>
          <button
            type="button"
            className="btn bg-mikado_yellow-500 outline outline-2"
            onClick={() => router.push(`/course/${params.courseId}/modules/1`)}
          >
            Go to Lesson 1
          </button>
        </div>
        <div className="collapse collapse-arrow bg-nyanza-800 max-w-[75%] outline outline-2 ">
          <input type="checkbox" />
          <div className="collapse-title text-3xl font-semibold">
            Module 2: What is Seneca?
          </div>
          <div className="collapse-content text-xl ">
            <p>
              Maecenas hendrerit mi vitae turpis porttitor tempor. Duis
              porttitor eros a arcu lacinia congue. Phasellus id leo justo.
              Donec vitae tincidunt sem. Vivamus mollis leo ac purus condimentum
              condimentum. Donec suscipit velit elit, id imperdiet leo
              sollicitudin id. Quisque a quam quis felis fermentum tempus.
              Quisque aliquet id turpis nec tempor. Nullam lacinia dolor quis
              arcu hendrerit, ut tincidunt eros lacinia. Nullam dapibus, nisi et
              fermentum volutpat, leo neque interdum lectus, et mattis dui diam
              quis erat. Quisque nisl justo, gravida eget ullamcorper non,
              commodo iaculis nibh. Curabitur at magna placerat, convallis est
              a, porta purus.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-nyanza-800 max-w-[75%] text-3xl outline outline-2 ">
          <input type="checkbox" />
          <div className="collapse-title text-3xl font-semibold">
            Moudle 3: Can I contribute to Seneca?
          </div>
          <div className="collapse-content text-xl">
            <p>
              Sed tempor egestas maximus. Nam facilisis sollicitudin venenatis.
              Nam ultrices venenatis massa id pretium. Aliquam elementum elit at
              imperdiet ornare. Nullam maximus sem nulla. Quisque efficitur,
              erat at aliquet consequat, ex lorem facilisis diam, ut accumsan
              nisl tortor sit amet quam. Nullam rhoncus vulputate felis eu
              convallis. Donec auctor nulla non eros maximus viverra.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Donec dignissim neque sed dui
              facilisis tincidunt. Donec sit amet odio nunc. Nunc sodales id
              ante a elementum. Nunc at mi lacus. Praesent a justo massa.
              Vivamus ac vulputate nisl, vel maximus turpis. Curabitur blandit
              nulla nec dolor vehicula eleifend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
