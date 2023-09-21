"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchSeasonDetails,
  img_base_uri,
  seasonDetails,
} from "@/app/api/fetchData";
import { Image, Progress, Spinner } from "@nextui-org/react";
import EpisodeCard from "@/app/components/EpisodeCard/episodeCard";

const SeasonDetails = () => {
  const { id, seasonnumber } = useParams();
  const [seasonDetails, setSeasonDetails] = useState<seasonDetails>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const getSeason = async () => {
    const data = await fetchSeasonDetails(+id, +seasonnumber);
    setSeasonDetails(data);
    setIsloading(false);
  };
  useEffect(() => {
    getSeason();
  }, []);

  if (isLoading && seasonDetails?.poster_path === undefined)
    return <Spinner></Spinner>;
  else {
    return (
      <div>
        <div
          className=" md:grid w-full md:w-4/5 mx-auto bg-gray-800 rounded-md p-8 gap-8 items-center"
          style={{ gridTemplateColumns: "3fr 7fr" }}
        >
          <Image
            src={`${img_base_uri}${seasonDetails?.poster_path!}`}
            alt=""
            className=""
            shadow="lg"
          ></Image>
          <div className="flex flex-col gap-4 mt-8 md:mt-0">
            <h1 className=" text-2xl font-bold">
              {seasonDetails?.name}
              &nbsp;
              <small>({seasonDetails?.season_number})</small>
            </h1>
            <h1 className=" text-2xl">{seasonDetails?.air_date}</h1>
            <p>
              {seasonDetails?.episodes.length! > 1
                ? `${seasonDetails?.episodes.length} Episodes`
                : `${seasonDetails?.episodes.length} Episode`}
            </p>
            <div className="w-1/2">
              <Progress
                value={seasonDetails?.vote_average! * 10}
                showValueLabel
                size="sm"
              ></Progress>
            </div>
            <p>{seasonDetails?.overview}</p>
          </div>
        </div>
        <div className="w-full md:w-11/12 xl:w-4/5 my-8 mx-auto ">
          <h1 className="font-bold text-3xl">Episodes </h1>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4 my-4">
            {seasonDetails?.episodes.map((episode) => {
              return (
                <EpisodeCard episode={episode} key={episode.id}></EpisodeCard>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default SeasonDetails;
