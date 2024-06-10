import email from "next-auth/providers/email";
import passage from "next-auth/providers/passage";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const CourseSchema = z.object({
  name: z.string().min(1, {
    message: "First and Lastname is required",
  }),

  courseId: z.string().min(1, {
    message: "Course ID is required",
  }),

  description: z.string().min(1, {
    message: "Please put a small description about your course",
  }),
});

export const UpdateCourseSchema = z.object({
  id: z.string().max(24, {
    message: "Invalid ID",
  }),
  name: z.string().min(1, {
    message: "First and Lastname is required",
  }),
  courseId: z.string().min(1, {
    message: "Course ID is required",
  }),
  description: z.string().min(1, {
    message: "Please put a small description about your course",
  }),
  price: z.string({ message: "Price must be a number" }),
  status: z
    .string()
    .min(1, { message: "Published or Unpublished must be decalred" }),
});
