"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Enrollment, getEnrollmentStudent } from "@/actions/enroll";

const Read = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Enrollment[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getEnrollmentStudent();
      setCourses(result);
      console.log(result);
    };
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <>
      {courses.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-row gap-10 ">
          {courses.map((course) =>
            course.course.status === "Published" ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className="bg-citypop-300 card shadow-[10px_5px_0_0_#000] outline outline-1 hover:outline-2 rounded-md h-1/5 w-1/4"
                  onClick={() =>
                    (
                      document?.getElementById(
                        `course_preview_${course._id}`
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  <div className="border-b-2 bg-citypop-200 h-5 flex flex-row-reverse ">
                    <button className="border-2 bg-citypop-500 w-7 m-0.5 rounded-full  ">
                      {" "}
                    </button>
                    <button className="border-2 bg-citypop-400 w-7 m-0.5 rounded-full  ">
                      {" "}
                    </button>
                  </div>
                  <figure className="outline outline-1 m-2 rounded-sm">
                    <img src="/Wallpapers/blueCitypop.png" alt="Shoes" />
                  </figure>
                  <div className="card-body ">
                    {course.course.status === "Published" ? (
                      <>
                        {" "}
                        <div className="flex flex-col justify-between  ">
                          <h2 className="card-content font-semibold -m-5 flex flex-col gap-2">
                            {course.course.name}
                            <progress
                              className="progress w-56"
                              value="10"
                              max="100"
                            ></progress>
                          </h2>
                        </div>
                        <dialog
                          id={`course_preview_${course._id}`}
                          className="modal"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Would you like to continue {course.course.name}?
                            </h3>
                            <p className="py-4">{course.course.description}</p>
                            <div className="modal-action">
                              {/* <button className="btn">Enroll Now!</button> */}
                              <button
                                className="btn"
                                onClick={() => {
                                  router.push(
                                    `/course/${course.course.courseId}`
                                  );
                                }}
                              >
                                {" "}
                                See More
                              </button>
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </>
                    ) : (
                      <div className="flex flex-row space-x-2 ">
                        <h2 className="text-lg font-semibold">
                          {course.course.name}
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment key={course._id}></React.Fragment>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Read;
