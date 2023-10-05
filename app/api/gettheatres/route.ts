import { NextResponse } from "next/server";
import { theatreModel } from "@/lib/db";
import { theatreInterface, Timings, dateInterface } from "@/app/book/[id]/page";

export async function POST(req: any) {
  const { city, state, dateRequest, id } = await req.json();
  try {
    const theatres: theatreInterface[] = await theatreModel
      .find({
        city: city,
        state: state,
      })
      .lean();
    const updatedTheatres: theatreInterface[] = theatres.map((theatre) => {
      let findMovie = theatre.movies.find((movie) => movie.movie === +id);
      if (findMovie === undefined) {
        // Create a new movie object if 'findMovie' is undefined
        findMovie = {
          movie: +id,
          time: theatre.timings.map((timing) => ({
            time: timing,
            date: [{ date: dateRequest, seats_booked: 0 }],
          })),
        };
        // Add the new movie object to the 'movies' array
        theatre.movies.push(findMovie);
      } else {
        // Update the existing movie object with the requested date
        findMovie.time.forEach((time) => {
          const dateIndex = time.date.findIndex((d) => d.date === dateRequest);
          if (dateIndex === -1) {
            // If the date doesn't exist, add it
            time.date.push({ date: dateRequest, seats_booked: 0 });
          }
        });
      }
      return theatre;
    });

    // Filter the 'updatedTheatres' array to return only the desired movie with matching 'movie'
    const filteredTheatres = updatedTheatres.map((theatre) => ({
      ...theatre,
      movies: theatre.movies
        .filter((movie) => movie.movie === +id)
        .map((movie) => ({
          ...movie,
          time: movie.time.filter((time) =>
            time.date.some((d) => d.date === dateRequest)
          ),
        })),
    }));
    return NextResponse.json(
      { message: "theatre data", data: { theatres: filteredTheatres } },
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
