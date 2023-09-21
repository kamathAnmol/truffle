"use client";

import { detailsType, fetchLatest, getAllTrending } from "@/app/api/fetchData";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import Display1 from "./components/display/display1";
import { genreInterface } from "@/app/api/fetchData";
import Link from "next/link";
import Swiper from "./components/swiper/swiper";
interface gens {
  movie: genreInterface[];
  tv: genreInterface[];
}

export default function Home() {
  const [allTrending, setAllTrending] = useState<detailsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTreandingMovies] = useState<detailsType[]>([]);
  const [trendingShows, setTreandingShows] = useState<detailsType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const all = await getAllTrending();
      setAllTrending(all);
      const movies = await fetchLatest("movie");
      setTreandingMovies(movies);
      const shows = await fetchLatest("tv");
      setTreandingShows(shows);

      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <Spinner aria-label="Loading..." className="w-full h-full m-auto mt-44" />
    );
  } else {
    return (
      <div className="home-container">
        <Swiper list={allTrending}></Swiper>
        <div className="w-10/12 mx-auto my-16 bg-slate-950 py-8 rounded-xl">
          <h1 className="font-bold text-xl ml-8 ">
            New Releases <small>(movies)</small>
          </h1>
          <Display1 list={trendingMovies}></Display1>
        </div>
        <div className="w-10/12 mx-auto my-16 bg-zinc-900 py-8 rounded-xl">
          <h1 className="font-bold text-xl ml-8 ">
            New Releases <small>(Shows)</small>
          </h1>
          <Display1 list={trendingShows}></Display1>
        </div>
        <div className="w-10/12 mx-auto my-16 bg-stone-900 p-8 rounded-xl">
          <h1 className="font-bold text-xl">Discover</h1>
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 ">
            <Link href="/movies/genres">
              <Button variant="ghost" size="lg">
                Movies by genre
              </Button>
            </Link>
            <Link href="/movies/languages">
              <Button variant="ghost" size="lg">
                Movies by languages
              </Button>
            </Link>
            <Link href="/shows/genres">
              <Button variant="ghost" size="lg">
                Shows by genre
              </Button>
            </Link>
            <Link href="/shows/languages">
              <Button variant="ghost" size="lg">
                Shows by languages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
