"use server";
import { connectToDB } from "@/app/lib/db";
import Enrollment from "@/models/enrollments";
import { auth } from "@/auth";
import Course from "@/models/courses";
import { enrollStudentSchema } from "@/app/schema";
import * as z from "zod";
import User from "@/models/user";
import { Publisher } from "./courses";

export interface Enrollment {
  _id: string;
  student: string;
  course: Course;
  status: string;
}

export interface Course {
  _id: string;
  name: string;
  courseId: string;
  description: string;
  publisher: Publisher;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  sub_Mode: string;
  price: number;
}

export const enrollStudent = async (
  values: z.infer<typeof enrollStudentSchema>
) => {
  const session = await auth();
  const validatedForm = enrollStudentSchema.safeParse(values);
  if (!validatedForm.success) {
    return { error: "Invalidated Fields!" };
  }

  await connectToDB();
  try {
    const { courseName } = validatedForm.data;

    const courseData = await Course.findOne({ name: courseName });

    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });

    const existingEnrollment = await Enrollment.findOne({
      student: student._id,
      course: courseData._id,
    });

    if (existingEnrollment) {
      return { error: "You are already enrolled in this course!" };
    }

    const enrollment = new Enrollment({
      student: student._id,
      course: courseData._id,
      status: "ONGOING",
    });

    await enrollment.save();

    return { message: "Enrolled Successfully" };
  } catch (error) {
    return { error: error };
  }
};

export const get_Enrollments = async (courseId: string) => {
  const session = await auth();
  try {
    await connectToDB();
    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });
    const courseData = await Course.findOne({ courseId: courseId });
    const enrollment = await Enrollment.findOne({
      course: courseData._id,
      student: student._id,
    });
    return !!enrollment;
  } catch (error) {
    return { error: error };
  }
};

export const getEnrollmentStudent = async () => {
  const session = await auth();
  try {
    await connectToDB();
    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });

    const enrollment = await Enrollment.find({
      student: student._id,
    }).populate("course");

    const data = JSON.parse(JSON.stringify(enrollment));
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const unenrollStudent = async (courseId: string) => {
  try {
    const session = await auth();
    await connectToDB();

    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });

    const courseData = await Course.findOne({ courseId: courseId });

    const enrollment = await Enrollment.findOneAndDelete({
      course: courseData._id,
      student: student._id,
    });

    return { message: "Unenrolled Successfully" };
  } catch (error) {
    return { error: error };
  }
};

export const getCoursesStudent = async () => {
  const session = await auth();
  try {
    await connectToDB();
    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });
    const enrollment = await Enrollment.find({
      student: student._id,
    });

    const courses = await Course.find({
      _id: enrollment.map((enroll) => enroll.course),
    });
    const data = JSON.parse(JSON.stringify(courses));
    return data;
  } catch (error) {
    return { error: error };
  }
};
