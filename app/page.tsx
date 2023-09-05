"use client";

import { MediaItem, getAllTrending } from "@/api/fetchMovieData";
import Carousel from "@/components/carousel/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Home() {
  const [allTrending, setAllTrending] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllTrending();
      setAllTrending(data);
      setIsLoading(false);
    };
    getData();
  }, []);
  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  } else {
    return (
      <div className="home-container">
        <Carousel data={allTrending}></Carousel>
      </div>
    );
  }
}
