"use server";

import { userModel } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    if (!req) {
      console.log(req);
      return NextResponse.json(
        { message: "Request is undefined" },
        { status: 400 }
      );
    }

    const { email, password } = await req.json();
    const uid = await userModel.exists({ email });
    console.log(uid);
    if (uid == null) {
      return NextResponse.json(
        { message: "User does not exist, please register" },
        { status: 401 }
      );
    } else {
      const user = await userModel.findById(uid);
      if (
        user.email === email &&
        (await bcrypt.compare(password, user.password))
      ) {
        return NextResponse.json(
          { message: "Logged in successfully", uid: uid },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
