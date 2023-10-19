import { showsInterface } from "@/app/components/theatre Card/theatreCard";
import { showsModal } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const requestBody = await req.json();
  const show: showsInterface = requestBody.show;
  try {
    const result = await showsModal.updateOne({ _id: show._id }, { ...show });
    if (result.acknowledged) {
      return NextResponse.json(
        { Message: "Updated the shows db", data: result },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Error while Updating Show" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { Message: "Error while Updating Shows", error },
      { status: 401 }
    );
  }
};
