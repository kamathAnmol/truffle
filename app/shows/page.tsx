"use client";

import React, { useEffect, useState } from "react";
import { detailsType, fetchLatest } from "../api/fetchData";
import Carousel from "../components/carousel/carousel";

const ShowsComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trendingShows, setTreandingShows] = useState<detailsType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const shows = await fetchLatest("tv");
      setTreandingShows(shows);
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <div>
      <Carousel data={trendingShows}></Carousel>
    </div>
  );
};

export default ShowsComponent;
