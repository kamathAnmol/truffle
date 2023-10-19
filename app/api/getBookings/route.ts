import { bookingModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { user } = await req.json();
  try {
    const result = await bookingModel.find({ user: user });

    return NextResponse.json(
      { message: "Bookings Fooound", data: result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { Message: "error while Getting Bookings", error },
      { status: 401 }
    );
  }
};
