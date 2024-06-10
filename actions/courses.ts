"use server";
import * as z from "zod";
import { CourseSchema, UpdateCourseSchema } from "@/schema";

import { connectToDB } from "@/app/lib/db";
import Course from "@/app/models/courses";
import { auth } from "@/auth";

export interface Course {
  _id: string;
  name: string;
  courseId: string;
  description: string;
  publisher: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  sub_Mode: string;
  price: number;
}

export const CreateCourse = async (values: z.infer<typeof CourseSchema>) => {
  const session = await auth();
  const validatedForm = CourseSchema.safeParse(values);
  if (!validatedForm.success) {
    console.log("Meh");
    return { error: "Invalidated Fields!" };
  }

  try {
    await connectToDB();

    const { name, courseId, description } = validatedForm.data;

    const existingCourse = await Course.findOne({ name });
    const existingCourseId = await Course.findOne({ courseId });

    if (existingCourse) {
      console.log("A Course with this name already exists!");
      return { error: "Course already exists!" };
    }
    if (existingCourseId) {
      console.log("A course with this course Id already exists!");
      return { error: "Course already exists!" };
    }

    if (!name || !courseId || !description) {
      return { error: "Missing Field" };
    }

    await Course.create({
      name,
      courseId,
      description,
      publisher: session?.user?.name,
      status: "Unpublished",
      sub_Mode: "Free",
      price: 0,
    });

    return { message: "Course Registered." };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const del_Course = async (id: string) => {
  try {
    await connectToDB();
    const courses = await Course.findOneAndDelete({ _id: id });
    const data = JSON.parse(JSON.stringify(courses));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const get_One_Course = async (id: string) => {
  try {
    await connectToDB();
    const courses = await Course.findOne({ courseId: id });
    const data = JSON.parse(JSON.stringify(courses));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCourses = async (): Promise<Course[]> => {
  await connectToDB();

  try {
    const courses = await Course.find({});
    const data = JSON.parse(JSON.stringify(courses));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCourse = async (
  values: z.infer<typeof UpdateCourseSchema>
) => {
  const validatedForm = UpdateCourseSchema.safeParse(values);
  if (!validatedForm.success) {
    return { error: "Invalidated Fields!" };
  }

  try {
    await connectToDB();

    const { id, name, courseId, description, price, status } =
      validatedForm.data;

    if (!name) {
      return { error: "Insert a name please" };
    }
    if (!description) {
      return { error: "Description cannot be empty" };
    }
    if (!price) {
      return {
        error: "Enter a price. Set to 0 for the price to be automatically free",
      };
    }
    if (!status) {
      return { error: "Missing Status Field" };
    }

    // checks if the names are the same from before

    //checks if the attriubtes are as  the same as another in the database
    const existingCourseId = await Course.findOne({ courseId: courseId });
    const existingCourseName = await Course.findOne({ name });

    if (existingCourseName) {
      if (existingCourseName._id.toString() !== id) {
        return { error: "A Course with this Name already exists " };
      }
    }

    if (existingCourseId) {
      if (existingCourseId._id.toString() !== id) {
        return { error: "Course Id already exists." };
      }
    }

    if (Number(price) === 0) {
      await Course.findByIdAndUpdate(id, {
        name: name,
        courseId: courseId,
        description: description,
        price: price,
        status: status,
        sub_Mode: "Free",
      });
      return { message: "Course Updated Successfully" };
    } else {
      await Course.findByIdAndUpdate(id, {
        name: name,
        courseId: courseId,
        description: description,
        price: price,
        status: status,
        sub_Mode: "Paid",
      });
      return { message: "Course Updated Successfully" };
    }
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
