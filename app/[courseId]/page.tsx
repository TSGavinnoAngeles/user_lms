"use client";

import React, { useEffect, useState } from "react";
import { get_One_Course } from "@/actions/courses";
import { Course } from "@/actions/courses";
import Navbar from "@/app/components/Dashboard/Navbar";
import EnrollmentModal from "@/app/components/CourseCaatComps/EnrollmentModal";
import { get_Enrollments } from "@/actions/enroll";

const Editor = ({ params }: { params: { courseId: string } }) => {
  const [courses, setCourses] = useState<Course>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (courses) {
      return;
    }
    const fetchCourses = async () => {
      const result = await get_One_Course(params.courseId);
      if (result.error) {
        console.error(result.error);
      } else {
        setCourses(result);
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
  }, [params.courseId, isModalOpen]);

  return courses?.status === "Published" ? (
    <div>
      <Navbar />
      <div
        className="hero min-h-[700px] z-0 outline outline-1"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg')",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card w-100 bg-nyanza-900">
            <div className="card-body">
              <h2 className="card-title text-5xl">
                Welcome to {courses?.name}
              </h2>
              <h2 className="card-title text-2xl">
                Publihed by: {courses?.publisher.name}
              </h2>
              <p>{courses?.description}</p>
              <div className="justify-start flex flex-row py-6"></div>
              <div>
                {isEnrolled ? (
                  <div className="space-x-24">
                    <button
                      disabled={true}
                      className="btn bg-mikado_yellow-500 outline outline-2 "
                    >
                      <a className="text-rich_black-100">
                        {" "}
                        {`You're already enrolled in ${courses?.name}`}
                      </a>
                    </button>
                    <button className="btn bg-bittersweet_shimmer outline outline-2 ">
                      {" "}
                      Would You like to unenroll?
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      (
                        document?.getElementById(
                          `open_modal_enrollment`
                        ) as HTMLDialogElement
                      )?.showModal()
                    }
                    className="btn bg-mikado_yellow-500 outline outline-2"
                  >
                    Enroll in {courses?.name} Now!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid place-items-center bg-nyanza-800 text-3xl py-9 min-w-screen space-y-1">
        <div className="collapse bg-nyanza-800 max-w-[75%] outline outline-2 p-1 ">
          <input type="checkbox" />
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
          <div className="collapse-title text-3xl font-semibold">
            Module 1: Huh?
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
      <dialog id="open_modal_enrollment" className="modal">
        <EnrollmentModal
          courseId={params.courseId}
          name={courses?.name || "--"}
          setIsModalOpen={setIsModalOpen}
        />
      </dialog>
    </div>
  ) : (
    <div>
      <Navbar />
      <div
        className="hero min-h-[653px] z-0 outline outline-1"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg')",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="card w-100 bg-nyanza-900">
            <div className="card-body">
              <h2 className="card-title text-5xl">
                WHOOPS THIS COURSE IS YET TO BE PUBLISHED
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

export default Editor;
