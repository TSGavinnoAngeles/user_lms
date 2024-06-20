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
        <div className="flex flex-wrap gap-5">
          {courses.map((course) =>
            course.status === "Published" ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className="card bg-citypop-500 transition-all shadow-[5px_5px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] outline outline-1 rounded-md h-1/5 w-1/4"
                  onClick={() => {
                    router.push(`/course/${course.courseId}`);
                  }}
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
                    {course.status === "Published" ? (
                      <>
                        {" "}
                        <div className="flex flex-col justify-between  ">
                          <h2 className="card-content font-semibold -m-5 flex flex-col gap-2">
                            {course.name}
                          </h2>
                        </div>
                        <dialog
                          id={`course_preview_${course._id}`}
                          className="modal"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Would you like to continue {course.name}?
                            </h3>
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
