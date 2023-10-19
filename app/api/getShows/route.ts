import { showsModal, theatreModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { theatre, movie, date, time } = await req.json();
  try {
    const data = await showsModal.findOne({ theatre, movie, date, time });
    if (data === null) {
      const newDoc = new showsModal({
        theatre,
        movie,
        date,
        time,
        booked_seats: { silver: [], gold: [], platinum: [] },
      });
      newDoc.save();
      return NextResponse.json(
        {
          message: "Data Not found Added new data",
          data: newDoc,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Data Found", data: data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error while fetching shows", error },
      { status: 401 }
    );
  }
};
