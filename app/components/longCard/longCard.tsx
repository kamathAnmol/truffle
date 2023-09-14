"use client";

import React, { useEffect, useState } from "react";

import {
  MediaItem,
  detailsType,
  fetchGenres,
  genreInterface,
  img_base_uri,
} from "@/app/api/fetchData";
import { Progress, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  watchListInterface,
  watchListSelector,
  selectCurrentUser,
} from "@/store/root-reducer";
import HeartBtn from "../heartBtn/heartBtn";
interface cardProps {
  item: MediaItem | detailsType;
  key: number;
}

const LongCard = (props: cardProps) => {
  const { item, key } = props;
  const [genres, setGenres] = useState<genreInterface[]>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const uid = useSelector(selectCurrentUser);

  const watchlist: watchListInterface = useSelector(watchListSelector);

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      if (item.media_type === "movie") {
        const filteredGenres = data.movie.filter((genre: genreInterface) =>
          item.genre_ids!.includes(genre.id)
        );
        setGenres(filteredGenres);
      }
      if (item.media_type === "tv") {
        const filteredGenres = data.tv.filter((genre: genreInterface) =>
          item.genre_ids!.includes(genre.id)
        );
        setGenres(filteredGenres);
      }
    };
    getGenres();
  }, [item.genre_ids, item.media_type]);
  useEffect(() => {
    const checkWatchList = () => {
      if (item.media_type === "movie") {
        if (watchlist.movieWatchList.includes(item?.id.toString()!))
          setIsLiked(true);
        else setIsLiked(false);
      } else if (item.media_type == "tv") {
        if (watchlist.tvWatchList.includes(item?.id.toString()!))
          setIsLiked(true);
        else setIsLiked(false);
      }
    };
    checkWatchList();
  }, [watchlist, item?.id, item.media_type]);

  const imgPath = (): string => {
    let img =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    if (!item.poster_path && !item.profile_path) {
      img =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    } else {
      img = `${img_base_uri}${item.poster_path || item.profile_path}`;
    }

    return img;
  };

  const img = imgPath();

  return (
    <div
      className="rounded-md relative "
      style={{
        background: item.backdrop_path
          ? `url("${img_base_uri}${item.backdrop_path && item.backdrop_path}")`
          : "#494949",
        maxHeight: "400px",
      }}
      key={key}
    >
      {(item.media_type === "movie" || item.media_type === "tv") &&
        uid !== null && (
          <div className="absolute top-3 right-3 w-14  ">
            <HeartBtn
              active={isLiked!}
              type={item.media_type}
              id={item.id.toString()}
            ></HeartBtn>
          </div>
        )}
      <Link href={`/details/${item.media_type}/${item.id}`}>
        <div className="bg-black/80 flex flex-col md:flex-row md:gap-5 p-8 rounded-md ">
          <Image
            src={img}
            alt="poster"
            className=" rounded-md md:self-center self-start"
            style={{ aspectRatio: "9/16", height: "25vw", maxHeight: "300px" }}
          ></Image>
          <div className="flex flex-col gap-2 md:gap-5">
            <h1 className="font-bold text-base md:text-lg">
              {item.name || item.title || item.name}&nbsp;
              <small>({item.original_name || item.original_title})</small>
            </h1>
            {item.vote_average !== 0 && item.vote_average !== undefined && (
              <div className=" w-2/6 py-3 ">
                <Progress
                  color="primary"
                  aria-label="Rating"
                  value={item.vote_average * 10}
                  showValueLabel
                  size="sm"
                />
              </div>
            )}
            <div className="genre-container flex">
              {genres?.map((genre) => {
                return <Chip key={genre.id}>{genre.name}</Chip>;
              })}
            </div>

            {(item.release_date || item.first_air_date) && (
              <p>{item.release_date || item.first_air_date}</p>
            )}
            {item.overview && (
              <p className="clip  h-2/4  overflow-hidden hidden md:block">
                {item.overview && item.overview.substring(0, 200)}...
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LongCard;
