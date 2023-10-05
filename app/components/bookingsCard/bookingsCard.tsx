"use client";
import { detailsType, fetchDetails, img_base_uri } from "@/app/api/fetchData";
import { bookingInterface } from "@/app/api/updateBookings/route";
import { theatreInterface } from "@/app/book/[id]/page";
import { Card, CardBody, Image, Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  item: bookingInterface;
};

const BookingsCard = ({ item }: Props) => {
  const [theatreDetails, setTheatreDetails] = useState<theatreInterface>();
  const [movieDetails, setMovieDetails] = useState<detailsType>();
  useEffect(() => {
    const getBookingDeatils = async () => {
      const movieDetails = await fetchDetails(
        "movie",
        item.movie_id.toString()
      );
      const response = await fetch("/api/getTheatreName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.theatre_id),
      });
      if (response.ok) {
        const data = await response.json();
        const theatre = data.theatre;
        setMovieDetails(movieDetails);
        setTheatreDetails(theatre);
      } else console.log(response);
    };
    getBookingDeatils();
  }, [item.movie_id, item.theatre_id]);
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="flex gap-6 md:gap-4 ">
          <div className="relative col-span-2">
            <Image
              alt="Album cover"
              className="rounded-md max-h-60 md:max-h-80 xl:max-h-96"
              shadow="md"
              src={`${img_base_uri}${movieDetails?.poster_path!}`}
              width="100%"
            />
          </div>

          <div className="flex self-start">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg text-foreground/90">
                {movieDetails?.title}
                <Chip size="sm" className="ml-1">
                  {movieDetails?.original_language}
                </Chip>
              </h3>
              <div className="flex gap-2">
                {movieDetails?.genres?.map((genre) => (
                  <Chip size="sm" color="warning" key={genre.id}>
                    {genre.name}
                  </Chip>
                ))}
              </div>
              <h1 className=" text-3xl font-bold mt-2 ">
                {theatreDetails?.name}
              </h1>
              <h1 className=" text-xl font-medium mt-2 text-gray-500">
                {theatreDetails?.city},{theatreDetails?.state}
              </h1>
              <h1 className=" text-xl font-bold mt-2">
                {item.seats}{" "}
                <small className="text-gray-500">
                  {item.seats > 1 ? <>Seats</> : <>Seat</>}
                </small>
              </h1>
              <h1 className="font-bold text-2xl ">
                Time : {item.time.show_time}
              </h1>
              <h1 className="font-bold text-xl">
                Date : {item.time.show_date}
              </h1>
              <Link href={`/details/movie/${item.movie_id}`}>
                <Button>Movie Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BookingsCard;
