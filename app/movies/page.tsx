"use client";

import React, { useEffect, useState } from "react";
import { detailsType, fetchLatest } from "../api/fetchData";
import Swiper from "../components/swiper/swiper";

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
  return (
    <div>
      <Swiper list={trendingMovies}></Swiper>
    </div>
  );
};

export default MoviesComponent;
