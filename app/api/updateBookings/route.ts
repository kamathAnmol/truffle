import { bookingModel, theatreModel } from "@/lib/db";
import { NextResponse } from "next/server";

export interface bookingInterface {
  uid: string;
  movie_id: number;
  theatre_id: string;
  time: {
    show_time: string;
    show_date: string;
  };
  seats: number;
}

export async function POST(req: any) {
  console.log("requested");
  const { uid, movie_id, theatre_id, time, seats } = await req.json();
  try {
    const filter = { _id: theatre_id };
    const update = {
      $push: {
        "movies.$[movie].time.$[time].date": {
          date: time.show_date,
          seats_booked: seats,
        },
      },
    };
    const options = {
      arrayFilters: [
        { "movie.movie": movie_id },
        { "time.time": time.show_time },
      ],
    };

    const updateResult = await theatreModel.updateOne(filter, update, options);

    const newBooking: bookingInterface = {
      uid,
      movie_id,
      theatre_id,
      time,
      seats,
    };

    const newDocument = new bookingModel(newBooking);
    await newDocument.save();

    return NextResponse.json(
      { message: "Updated the Booking and Theater DB" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while processing the request" },
      { status: 500 }
    );
  }
}
