import { bookingModel } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const uid = await req.json();
  try {
    const bookings = await bookingModel.find({ uid: uid });
    return NextResponse.json(
      { message: "Found Bookings", bookings: bookings },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching Bookings", error: error },
      { status: 401 }
    );
  }
}
