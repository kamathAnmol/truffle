"use client";

import {
  detailsType,
  fetchLatest,
  getAllTrending,
  getLanguages,
  img_base_uri,
} from "@/app/api/fetchData";
import React, { useEffect, useState } from "react";
import { Button, Image, Spinner } from "@nextui-org/react";
import Display1 from "./components/display/display1";
import Link from "next/link";
import Swiper from "./components/swiper/swiper";
import { useDispatch } from "react-redux";
import { setClientLocation, setlanguages } from "@/store/root-reducer";

export default function Home() {
  const [allTrending, setAllTrending] = useState<detailsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTreandingMovies] = useState<detailsType[]>([]);
  const [trendingShows, setTreandingShows] = useState<detailsType[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const userLocation = await fetch("https://ipapi.co/json/");
      const result = await userLocation.json();
      dispatch(setClientLocation(result));
      const all = await getAllTrending();
      setAllTrending(all);
      const movies = await fetchLatest("movie");
      setTreandingMovies(movies);
      const shows = await fetchLatest("tv");
      setTreandingShows(shows);
      const lang = await getLanguages();
      dispatch(setlanguages(lang));
      setIsLoading(false);
    };
    getData();
  }, [dispatch]);
  if (isLoading) {
    return (
      <Spinner aria-label="Loading..." className="w-full h-full m-auto mt-44" />
    );
  } else {
    return (
      <div className="home-container">
        <Swiper list={allTrending}></Swiper>
        <div className="w-full md:w-10/12 mx-2 md:mx-auto my-16 py-8 rounded-xl bg-center relative overflow-hidden">
          <Image
            src={`${img_base_uri}${trendingMovies.at(0)?.backdrop_path}`}
            className=" blur-sm z-0 brightness-50"
            classNames={{
              wrapper: "absolute w-full h-full top-20 left-0 ",
            }}
            alt=""
          ></Image>
          <h1 className="font-bold text-xl ml-8 z-10">
            New Releases <small>(movies)</small>
          </h1>
          <Display1 list={trendingMovies}></Display1>
        </div>
        <div className="w-full md:w-10/12 mx-2 md:mx-auto my-16  py-8 rounded-xl px-3 relative overflow-hidden">
          <Image
            src={`${img_base_uri}${trendingShows.at(0)?.backdrop_path}`}
            className=" blur-sm z-0 brightness-50"
            classNames={{
              wrapper: "absolute w-full h-full top-20 left-0",
            }}
            alt=""
          ></Image>
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
