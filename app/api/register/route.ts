"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);
    console.log({ name, email, hashPassword });

    return NextResponse.json(
      { messege: "User Registerd Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { messege: "error while creating user" },
      { status: 500 }
    );
  }
}
