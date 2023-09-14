"use client";

import {
  Person,
  detailsType,
  fetchCredits,
  fetchDetails,
  img_base_uri,
} from "@/app/api/fetchData";
import { watchListInterface, watchListSelector } from "@/store/root-reducer";
import { Chip, Image, Progress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeartBtn from "@/app/components/heartBtn/heartBtn";
import Display3 from "@/app/components/display/display3";

const DetailPage = ({ params }: { params: { query: string[] } }) => {
  const query = params.query;
  const [details, setDetails] = useState<detailsType>();
  const [crew, setCrew] = useState<Person[]>();
  const [cast, setCast] = useState<Person[]>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const watchlist: watchListInterface = useSelector(watchListSelector);

  useEffect(() => {
    const fetchData = async () => {
      const data: detailsType = await fetchDetails(query[0], query[1]);
      setDetails(data);
      const getCredits = await fetchCredits(query[0], query[1]);
      setCast(getCredits.cast);
      setCrew(getCredits.crew);
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    const checkWatchList = () => {
      if (query[0] === "movie") {
        if (watchlist.movieWatchList.includes(details?.id.toString()!))
          setIsLiked(true);
        else setIsLiked(false);
      } else if (query[0] == "tv") {
        if (watchlist.tvWatchList.includes(details?.id.toString()!))
          setIsLiked(true);
        else setIsLiked(false);
      }
    };
    checkWatchList();
  }, [watchlist, details?.id, query]);

  return (
    <div>
      <div
        className="top-container w-full md:w-4/5 mx-auto "
        style={{
          background: details?.backdrop_path
            ? `url(${img_base_uri}${details?.backdrop_path}) no-repeat`
            : "#363636",
          minHeight: "30vw",
        }}
      >
        <div
          className="backdrop-wrapper flex flex-col md:flex-row content-start md:content-center w-full  bg-black/70 backdrop-blur-sm p-20"
          style={{ minHeight: "30vw" }}
        >
          <div className="absolute top-3 right-3 w-14">
            <HeartBtn active={isLiked!} id={query[1]} type={query[0]} />
          </div>
          <div className="img-wrapper w-1/3 flex content-center md:m-auto">
            <Image
              src={`${img_base_uri}${
                details?.poster_path || details?.profile_path
              }`}
              alt=""
              className="w-2/3 rounded-md m-auto "
            />
          </div>
          <div className="content-wrapper w-3/4 my-14  md:my-auto h-4/5 flex flex-col gap-4 mx-10">
            <h1 className=" font-bold text-lg xl:text-3xl">
              {details?.name || details?.title} &nbsp;
              {(details?.original_name || details?.original_title) && (
                <span className=" font-thin text-lg">
                  ({details?.original_name || details?.original_title})
                </span>
              )}
            </h1>
            {(details?.first_air_date || details?.release_date) && (
              <span className="flex w-2/4 gap-2">
                <p>{details?.first_air_date || details?.release_date}</p>
                &#46;
                {details.number_of_episodes && (
                  <p>
                    {details.number_of_seasons}
                    {details.number_of_seasons! > 1 ? (
                      <> seasons</>
                    ) : (
                      <> season</>
                    )}
                  </p>
                )}
                {details.runtime && (
                  <p>{(details.runtime / 60).toFixed(1)}h </p>
                )}
              </span>
            )}
            {details?.vote_average && (
              <>
                <div className="progress-wrapper w-2/3">
                  <Progress
                    size="sm"
                    aria-label="Loading..."
                    value={details?.vote_average * 10}
                    showValueLabel={true}
                  />
                </div>
                <p>{details.vote_count} users have Voted this </p>
              </>
            )}
            <div className="flex">
              {details?.genres?.map((genre) => {
                return <Chip key={genre.id}>{genre.name}</Chip>;
              })}
            </div>
            {details?.tagline && (
              <p className=" opacity-75">{details?.tagline}</p>
            )}
            {details?.overview && <p>{details.overview}</p>}
          </div>
        </div>
      </div>
      <div className=" bg-stone-900 rounded-md p-8 w-4/5 mx-auto my-8">
        <h1 className="font-bold text-2xl">Cast</h1>
        <Display3 list={cast} key={query[1]}></Display3>
      </div>
      <div className=" bg-stone-900 rounded-md p-8 w-4/5 mx-auto my-8">
        <h1 className="font-bold text-2xl">Crew</h1>
        <Display3 list={crew} key={query[1]}></Display3>
      </div>
    </div>
  );
};

export default DetailPage;
