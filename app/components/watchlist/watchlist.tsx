import {
  detailsType,
  fetchDetails,
  fetchGenres,
  genreInterface,
  img_base_uri,
} from "@/app/api/fetchData";
import React, { useEffect, useState } from "react";
import HeartBtn from "../heartBtn/heartBtn";
import Link from "next/link";
import { Chip, Image, Progress } from "@nextui-org/react";
interface props {
  id: string;
  type: string;
}

const Watchlist = (props: props) => {
  const { id, type } = props;
  const [details, setdetails] = useState<detailsType>();
  const [genres, setGenres] = useState<genreInterface[]>();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchDetails(type, id);
      setdetails(data);
    };
    const getGenres = async () => {
      const data = await fetchGenres();
      if (details?.media_type === "movie") {
        const filteredGenres = data.movie.filter((genre: genreInterface) =>
          details!.genre_ids!.includes(genre.id)
        );
        setGenres(filteredGenres);
      }
      if (details?.media_type === "tv") {
        const filteredGenres = data.tv.filter((genre: genreInterface) =>
          details!.genre_ids!.includes(genre.id)
        );
        setGenres(filteredGenres);
      }
    };
    getGenres();

    fetchdata();
  }, [details, id, type]);

  const imgPath = (): string => {
    let img =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    if (!details?.poster_path && !details?.profile_path) {
      img =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    } else {
      img = `${img_base_uri}${details!.poster_path || details!.profile_path}`;
    }

    return img;
  };

  const img = imgPath();

  return (
    <div
      className="rounded-md relative "
      style={{
        background: details?.backdrop_path
          ? `url("${img_base_uri}${
              details.backdrop_path && details.backdrop_path
            }")`
          : "#494949",
        maxHeight: "400px",
      }}
      key={details?.id}
    >
      {(details?.media_type === "movie" || details?.media_type === "tv") && (
        <div className="absolute top-3 right-3 w-14  ">
          <HeartBtn
            type={details.media_type}
            id={details.id.toString()}
          ></HeartBtn>
        </div>
      )}
      <Link href={`/details/${details?.media_type}/${details?.id}`}>
        <div className="bg-black/80 flex gap-5 p-8 rounded-md ">
          <Image
            src={img}
            alt="poster"
            className=" rounded-md self-center max-h-96"
          ></Image>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-base md:text-lg">
              {details?.name || details?.title || details?.name}&nbsp;
              <small>
                ({details?.original_name || details?.original_title})
              </small>
            </h1>
            {details?.vote_average !== 0 &&
              details?.vote_average !== undefined && (
                <div className=" w-2/6 py-3 ">
                  <Progress
                    color="primary"
                    aria-label="Rating"
                    value={details.vote_average * 10}
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

            {(details?.release_date || details?.first_air_date) && (
              <p>{details.release_date || details?.first_air_date}</p>
            )}
            {details?.overview && (
              <p className="clip  h-2/4  overflow-hidden">
                {details.overview && details.overview.substring(0, 200)}...
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Watchlist;
