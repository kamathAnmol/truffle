import React from "react";

import { MediaItem, img_base_uri } from "@/app/api/fetchData";
import { NoImgMovie, NoImgPerson, NoImgTv } from "@/public/assests/noImg/noImg";
import { Progress } from "@nextui-org/react";
interface cardProps {
  item: MediaItem;
}

const LongCard = (props: cardProps) => {
  const { item } = props;

  const imgPath = (): string => {
    let img =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    if (!item.poster_path && !item.profile_path) {
      if (item.media_type === "movie") img = NoImgMovie();
      if (item.media_type === "tv") img = NoImgTv();
      if (item.media_type === "person") img = NoImgPerson();
    } else {
      img = `${img_base_uri}${item.poster_path || item.profile_path}`;
    }

    return img;
  };

  const img = imgPath();

  return (
    <div
      className="rounded-md  "
      style={{
        background: item.backdrop_path
          ? `url("${img_base_uri}${item.backdrop_path && item.backdrop_path}")`
          : "#494949",
        maxHeight: "400px",
      }}
    >
      <div className="bg-black/80 flex gap-5 p-8 rounded-md">
        <img
          src={img}
          alt="poster"
          className=" rounded-md self-center"
          style={{ aspectRatio: "9/16", height: "25vw", maxHeight: "300px" }}
        ></img>
        <div>
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
          {(item.release_date || item.first_air_date) && (
            <p>{item.release_date || item.first_air_date}</p>
          )}
          {item.overview && (
            <p className="clip  h-2/4  overflow-hidden">
              {item.overview && item.overview.substring(0, 200)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LongCard;
