"use client";
import React, { useEffect, useState } from "react";
import { getPublishedCourses } from "@/actions/courses";
import { Course } from "@/actions/courses";
import { useRouter } from "next/navigation";
import LinesEllipsis from "react-lines-ellipsis";
import { getCoursesStudent, getEnrollmentStudent } from "@/actions/enroll";

const Read = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolled, isEnrolled] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const result = await getPublishedCourses();
    setCourses(result);
  };
  const enrollment = async () => {
    const result = await getCoursesStudent();
    isEnrolled(result);
  };

  useEffect(() => {
    fetchCourses();
    enrollment();
  }, []);

  return (
    <>
      {courses.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-wrap gap-5 ml-32">
          {courses.map((course) =>
            enrolled.find((enroll) => enroll.courseId === course.courseId) ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className=" card bg-mikado_yellow-800 transition-all hover:shadow-[-10px_10px_0px_black] hover:translate-x-[3px] hover:translate-y-[-3px] outline outline-1 rounded-md h-80 w-1/4"
                  onClick={() => {
                    router.push(`/course/${course.courseId}`);
                  }}
                >
                  <div className="border-b-2 bg-mikado_yellow-900 p-0.5 flex flex-row justify-between">
                    <p className="text-sm font-mono mx-1">
                      Course In Progress...
                    </p>
                    <div className=" flex flex-row space-x-1 ">
                      <button className="border-2 h-2.5 w-5 bg-mikado_yellow-500 rounded-lg ">
                        {" "}
                      </button>
                      <button className="border-2 h-2.5 w-5 bg-mikado_yellow-400 rounded-lg ">
                        {" "}
                      </button>
                    </div>
                  </div>

                  <div className="card-body -m-5">
                    {course.status === "Published" ? (
                      <>
                        {" "}
                        <div className="flex flex-col   ">
                          <h2 className="card-content font-semibold  flex flex-col gap-1 text-2xl">
                            {course.name}
                          </h2>
                          <LinesEllipsis
                            className="text-sm"
                            text={course.description}
                            maxLine="3"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-row space-x-2 ">
                        <h2 className="text-lg font-semibold">{course.name}</h2>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ) : course.sub_Mode === "Free" ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className=" card bg-citypop-500 transition-all hover:shadow-[-10px_10px_0px_black] hover:translate-x-[3px] hover:translate-y-[-3px] outline outline-1 rounded-md h-h-80 w-1/4"
                  onClick={() => {
                    router.push(`/course/${course.courseId}`);
                  }}
                >
                  <div className="border-b-2 bg-citypop-100 p-0.5 flex flex-row justify-between">
                    <p className="text-sm font-mono mx-1">Free Course</p>
                    <div className=" flex flex-row space-x-1 ">
                      <button className="border-2 h-2.5 w-5 bg-citypop-500 rounded-lg ">
                        {" "}
                      </button>
                      <button className="border-2 h-2.5 w-5 bg-citypop-500 rounded-lg ">
                        {" "}
                      </button>
                    </div>
                  </div>

                  <div className="card-body -m-5 ">
                    {course.status === "Published" ? (
                      <>
                        {" "}
                        <div className="flex flex-col justify-between  ">
                          <h2 className="card-content font-semibold flex flex-col gap-2 text-2xl">
                            {course.name}
                          </h2>
                        </div>
                        <LinesEllipsis
                          className="text-sm"
                          text={course.description}
                          maxLine="3"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                        />
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
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className=" card bg-dodger_blue-700 transition-all hover:shadow-[-10px_10px_0px_black] hover:translate-x-[3px] hover:translate-y-[-3px] outline outline-1 rounded-md h-80 w-1/4"
                  onClick={() => {
                    router.push(`/course/${course.courseId}`);
                  }}
                >
                  <div className="border-b-2 bg-dodger_blue-900 p-0.5 flex flex-row justify-between">
                    <p className="text-sm font-mono mx-1">Course</p>
                    <div className=" flex flex-row space-x-1 ">
                      <button className="border-2 h-2.5 w-5 bg-dodger_blue-500 rounded-lg ">
                        {" "}
                      </button>
                      <button className="border-2 h-2.5 w-5 bg-dodger_blue-400 rounded-lg ">
                        {" "}
                      </button>
                    </div>
                  </div>

                  <div className="card-body -m-5">
                    {course.status === "Published" ? (
                      <>
                        {" "}
                        <div className="flex flex-col   ">
                          <h2 className="card-content font-semibold  flex flex-col gap-1 text-2xl">
                            {course.name}
                          </h2>
                          <LinesEllipsis
                            className="text-sm"
                            text={course.description}
                            maxLine="3"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-row space-x-2 ">
                        <h2 className="text-lg font-semibold">{course.name}</h2>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Read;
