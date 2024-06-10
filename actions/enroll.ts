"use server";
import { connectToDB } from "@/app/lib/db";
import Enrollment from "@/app/models/enrollments";
import { auth } from "@/auth";
import Course from "@/app/models/courses";
import { enrollStudentSchema } from "@/app/schema";
import * as z from "zod";
import User from "@/app/models/user";

export const enrollStudent = async (
  values: z.infer<typeof enrollStudentSchema>
) => {
  const session = await auth();
  const validatedForm = enrollStudentSchema.safeParse(values);
  if (!validatedForm.success) {
    console.log("Meh");
    return { error: "Invalidated Fields!" };
  }

  await connectToDB();
  try {
    const { courseName } = validatedForm.data;
    console.log("courseName", courseName);
    const courseData = await Course.findOne({ name: courseName });
    console.log(courseData._id);

    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });
    console.log(student);

    const existingEnrollment = await Enrollment.findOne({
      student: student._id,
      course: courseData._id,
    }).lean();

    console.log("yes", existingEnrollment);
    if (existingEnrollment) {
      return { error: "You are already enrolled in this course!" };
    }

    const enrollment = new Enrollment({
      student: student._id,
      course: courseData._id,
      status: "ONGOING",
    });
    await enrollment.save();

    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate("student")
      .populate("course");
    console.log(populatedEnrollment);
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
