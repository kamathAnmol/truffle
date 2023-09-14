"use client";

import React, { useEffect, useState } from "react";
import { detailsType, fetchLatest } from "../api/fetchData";
import Swiper from "../components/swiper/swiper";

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
      <Swiper list={trendingShows}></Swiper>
    </div>
  );
};

export default ShowsComponent;
