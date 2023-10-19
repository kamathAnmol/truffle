import { thetreInterface } from "@/app/book/[id]/page";
import { showsInterface } from "@/app/components/theatre Card/theatreCard";
import { showsModal, theatreModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { show } = await req.json();
  try {
    const showData: showsInterface | null = await showsModal.findById(show);
    if (showData) {
      const theatredata: thetreInterface | null = await theatreModel.findById(
        showData?.theatre
      );
      if (theatredata) {
        return NextResponse.json(
          { message: "found Theatre", data: theatredata },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Theatre not found" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while getinh theatre name",
        error,
      },
      { status: 401 }
    );
  }
};
