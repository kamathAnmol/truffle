"use client";

import React, { useEffect, useState } from "react";
import { detailsType, fetchLatest } from "../api/fetchData";
import Swiper from "../components/swiper/swiper";
import { Spinner } from "@nextui-org/react";

const MoviesComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTreandingMovies] = useState<detailsType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const movies = await fetchLatest("movie");
      setTreandingMovies(movies);
      setIsLoading(false);
    };
    getData();
  }, []);
  if (isLoading) return <Spinner></Spinner>;
  else
    return (
      <div>
        <Swiper list={trendingMovies}></Swiper>
      </div>
    );
};

export default MoviesComponent;
