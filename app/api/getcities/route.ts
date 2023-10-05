import { NextResponse } from "next/server";
import { theatreModel } from "@/lib/db";

export async function POST(req: any) {
  try {
    const data = await theatreModel.find({});
    const cities = data.map((item) => ({ city: item.city, state: item.state }));

    return NextResponse.json(
      { message: "cities data", data: { cities: cities } },
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        message: "error while finding the data",
        data: { error: error.message },
      },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
