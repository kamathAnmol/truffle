import React from "react";

import { MediaItem, img_base_uri } from "@/app/api/fetchData";
import Image from "next/image";
import { NoImgMovie, NoImgPerson, NoImgTv } from "@/public/assests/noImg";
interface cardProps {
  item: MediaItem;
}

const LongCard = (props: cardProps) => {
  const { item } = props;
  const imgPath = (): string => {
    let img = "";

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
      className="bg-white/40 flex gap-5 p-8 rounded-md"
      style={{
        background: item.backdrop_path
          ? `url("${img_base_uri}${item.backdrop_path && item.backdrop_path}")`
          : "#494949",
        opacity: "0.9",
      }}
    >
      <Image
        src={img}
        alt="poster"
        width={130}
        height={390}
        className=" rounded-md"
      ></Image>
      <div>
        <h1>{item.name || item.original_title || item.original_name}</h1>
        <p className="clip h-2/5">{item.overview && item.overview}</p>
      </div>
    </div>
  );
};

export default LongCard;
