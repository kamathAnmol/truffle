import { theatreModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { city, state } = await req.json();
  try {
    const response = await theatreModel.find({ city, state });

    return NextResponse.json({
      message: "Data found",
      theatres: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while Fetching data",
        error,
      },
      { status: 401 }
    );
  }
};
