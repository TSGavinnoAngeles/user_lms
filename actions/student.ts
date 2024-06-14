"use server";
import { connectToDB } from "@/app/lib/db";
import User from "@/models/user";
import { auth, signOut } from "@/auth";
import Enrollment from "@/models/enrollments";
import { revalidatePath } from "next/cache";

export const searchStudent = async () => {
  const session = await auth();
  try {
    await connectToDB();
    const student = await User.find({ name: name });
    const data = JSON.parse(JSON.stringify(student));
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const delStudent = async () => {
  const session = await auth();
  try {
    await connectToDB();
    const student = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });

    if (student.role === "admin") {
      return { error: "Admin cannot unenroll" };
    }
    const data = JSON.parse(JSON.stringify(student));
    console.log(data);

    // Delete the enrollments associated with the student
    if (student) {
      await Enrollment.deleteMany({ student: student._id });
      await User.deleteOne({ _id: student._id });
      try {
        await signOut();
        console.log("Student deleted successfully");
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
