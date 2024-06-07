"use client";
import React, { useEffect, useState } from "react";
import { getCourses } from "@/actions/courses";
import toast, { Toast, Toaster } from "react-hot-toast";

import { del_Course } from "@/actions/courses";
import { Course } from "@/actions/courses";

import { useRouter } from "next/navigation";

const Read = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [confirmation, setConfirmation] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCourses();
      setCourses(result);
      console.log(result);
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    toast(<b>{`Proceeding with deletion for ${name}`}</b>);
    await del_Course(id);
    window.location.reload();
  };

  return (
    <>
      {courses.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-row gap-1">
          {courses.map((course) =>
            course.status === "Published" ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className="card card-compact bg-neutral-200 shadow-xl outline outline-1 hover:outline-2 rounded-sm h-[300px] w-[113px] rotate-3"
                >
                  <div className="card-body ">
                    {course.status === "Published" ? (
                      <>
                        {" "}
                        <div
                          className="flex flex-col justify-between  "
                          onClick={() =>
                            (
                              document?.getElementById(
                                `course_preview_${course._id}`
                              ) as HTMLDialogElement
                            )?.showModal()
                          }
                        >
                          <div className="divider"></div>
                          <h2 className="card-title">{course.name}</h2>
                          <div className="divider"></div>
                        </div>
                        <dialog
                          id={`course_preview_${course._id}`}
                          className="modal"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Welcome to {course.name}
                            </h3>
                            <p>Created by: {course.publisher}</p>
                            <p className="py-4">{course.description}</p>
                            <div className="modal-action">
                              {/* <button className="btn">Enroll Now!</button> */}
                              <button
                                className="btn"
                                onClick={() => {
                                  router.push(`/course/${course.courseId}`);
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
                        <h2 className="text-lg font-semibold">{course.name}</h2>
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
