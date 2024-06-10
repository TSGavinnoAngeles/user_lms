import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),

  name: z.string().min(1, {
    message: "First and Lastname is required",
  }),
});

export const enrollStudentSchema = z.object({
  courseName: z.string().min(1, {
    message: "Course name is required",
  }),
  // student: z.string().min(1, {
  //   message: "Student is required",
  // }),
  // status: EnrollmentStatus,
});
