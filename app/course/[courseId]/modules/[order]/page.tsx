"use client";
import React, { useEffect, useState } from "react";
import { Course, get_One_Course } from "@/actions/courses";
import { get_Enrollments } from "@/actions/enroll";
import Navbar from "@/app/components/Dashboard/Navbar";
import { redirect } from "next/navigation";

const page = ({ params }: { params: { courseId: string; order: number } }) => {
  const [courses, setCourses] = useState<Course>();
  const [isEnrolled, setIsEnrolled] = useState(false);

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
  }, [params.courseId]);

  if (courses?.status !== "Published") {
    redirect(`/course/${params?.courseId}/error`);
  }
  if (!isEnrolled) {
    redirect(`/course/${params?.courseId}`);
  }
  return (
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
                WHOOPS THIS MODULE IS YET TO BE PUBLISHED
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

export default page;
