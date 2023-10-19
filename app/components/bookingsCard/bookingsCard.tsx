"use client";
import { detailsType, fetchDetails, img_base_uri } from "@/app/api/fetchData";
import { thetreInterface } from "@/app/book/[id]/page";
import { Card, CardBody, Image, Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { bookInterface } from "../theatre Card/theatreCard";

type Props = {
  item: bookInterface;
};

const BookingsCard = ({ item }: Props) => {
  const [theatreDetails, setTheatreDetails] = useState<thetreInterface>();
  const [movieDetails, setMovieDetails] = useState<detailsType>();
  useEffect(() => {
    const getBookingDeatils = async () => {
      const movieDetails = await fetchDetails("movie", item.movie.toString());
      const response = await fetch("/api/getTheatreName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show: item.show }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setMovieDetails(movieDetails);
        setTheatreDetails(data);
      } else console.log(response);
    };
    getBookingDeatils();
  }, [item.movie, item.show]);
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
              <div className="flex font-bold">
                <h1>Seats : </h1>
                {item.seats.silver.length ? (
                  item.seats.silver.map((seat, index) => {
                    return (
                      <Chip
                        color="default"
                        key={index}
                        variant="light"
                        size="sm"
                      >
                        {seat}
                      </Chip>
                    );
                  })
                ) : (
                  <></>
                )}
                {item.seats.gold.length ? (
                  item.seats.gold.map((seat, index) => {
                    return (
                      <Chip
                        color="warning"
                        key={index}
                        variant="light"
                        size="sm"
                      >
                        {seat}
                      </Chip>
                    );
                  })
                ) : (
                  <></>
                )}
                {item.seats.platinum.length ? (
                  item.seats.platinum.map((seat, index) => {
                    return (
                      <Chip
                        color="primary"
                        variant="light"
                        key={index}
                        size="sm"
                      >
                        {seat}
                      </Chip>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <h1 className="font-bold text-2xl ">Time : {item.time}</h1>
              <h1 className="font-bold text-xl">Date : {item.date}</h1>
              <Link href={`/details/movie/${item.movie}`}>
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
