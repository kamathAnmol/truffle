"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userModel } from "@/lib/db";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);
    if (await userModel.findOne({ email: email }))
      return NextResponse.json(
        { message: "email already in use" },
        { status: 401 }
      );
    const newUser = new userModel({ name, email, password: hashPassword });
    newUser.save();

    return NextResponse.json(
      { messege: "User Registerd Successfully", uid: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { messege: "error while creating user" },
      { status: 500 }
    );
  }
}
