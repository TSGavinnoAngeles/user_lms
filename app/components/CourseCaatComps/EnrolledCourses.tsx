"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Enrollment, getEnrollmentStudent } from "@/actions/enroll";
import Image from "next/image";

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
        <button
          onClick={() => router.push("/catalog")}
          className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          Enroll In A Course
        </button>
      ) : (
        <div className="flex flex-row gap-5 ">
          {courses.map((course) =>
            course.course.status === "Published" ? (
              <React.Fragment key={course._id}>
                <div
                  key={course._id}
                  className="card bg-citypop-500 transition-all hover:shadow-[10px_10px_0px_black] hover:translate-x-[-3px] hover:translate-y-[-3px] outline outline-1 rounded-md h-auto w-1/4"
                  onClick={() =>
                    router.push(`/course/${course.course.courseId}`)
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
