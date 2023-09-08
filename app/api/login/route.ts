"use server";

import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    return NextResponse.json(
      { messege: "User Logged in Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { messege: "error while loggin in" },
      { status: 500 }
    );
  }
}
