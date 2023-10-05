import { theatreInterface } from "@/app/book/[id]/page";
import { theatreModel } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const theatre_id = await req.json();
  const data: theatreInterface | null = await theatreModel
    .findById(theatre_id)
    .lean();

  try {
    return NextResponse.json(
      { message: "Found Theatre Name", theatre: data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching theatre name", error: error },
      { status: 401 }
    );
  }
}
