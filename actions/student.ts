"use server";
import { connectToDB } from "@/app/lib/db";
import User from "@/app/models/user";
import { auth } from "@/auth";

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
    if (session?.user) {
      return { error: "Missing Field" };
    }
    // const delStud = await User.findOneAndDelete({
    //   name: session?.user?.name,
    //   email: session?.user?.email,
    // });

    const delStud = await User.findOne({
      name: session?.user?.name,
      email: session?.user?.email,
    });
    const data = JSON.parse(JSON.stringify(delStud));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
