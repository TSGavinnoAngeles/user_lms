import { connectToDB } from "../../lib/db";
import bcrypt from "bcryptjs";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json("Please fill all the fields", { status: 400 });
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json("No User", { status: 400 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password Does not match");
      return NextResponse.json("No Password", { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error in Login: " + err);
  }
}
