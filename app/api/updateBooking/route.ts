import { bookingModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { data } = await req.json();
  try {
    const newDoc = new bookingModel({ ...data });
    newDoc.save();
    return NextResponse.json(
      { message: "booking Updated", data: await newDoc },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error while updating booking ", error },
      { status: 401 }
    );
  }
};
