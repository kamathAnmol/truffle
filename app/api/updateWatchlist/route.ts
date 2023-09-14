import { watchListModel } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const watchList = await req.json();
    const dbWatchList = await watchListModel.findOne({ uid: watchList.uid });
    if (dbWatchList === null) {
      console.log("null");
      const newWatchlist = new watchListModel(watchList);
      newWatchlist.save();
      return NextResponse.json(
        { message: "updated the watchlist" },
        { status: 201 }
      );
    } else {
      await watchListModel.updateOne({ uid: watchList.uid }, { ...watchList });
      return NextResponse.json(
        { message: "updated the watchlist" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
