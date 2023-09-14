import { watchListModel } from "@/lib/db";
import { NextResponse } from "next/server";
import { watchListInterface } from "@/store/root-reducer";

export async function POST(req: any) {
  try {
    const { uid } = await req.json();
    const watchList: watchListInterface | null = await watchListModel.findOne({
      uid: uid,
    });

    // Check if watchList is found before returning it
    if (watchList) {
      return NextResponse.json(
        { message: "WatchList found", watchList: watchList },
        { status: 201, headers: { "Content-Type": "applicaion/json" } }
      );
    } else {
      // Handle the case where watchList is not found
      return NextResponse.json(
        { message: "WatchList not found" },
        { status: 201, headers: { "Content-Type": "applicaion/json" } }
      );
    }
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "applicaion/json" } }
    );
  }
}
