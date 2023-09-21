import { Episode, img_base_uri } from "@/app/api/fetchData";
import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
  episode: Episode;
};

const EpisodeCard = ({ episode }: Props) => {
  let imgPath =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  if (episode.still_path !== null)
    imgPath = `${img_base_uri}${episode.still_path}`;
  function convertTime(minutes: number) {
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h.${remainingMinutes}m`;
    }
  }
  const duration = convertTime(episode.runtime);

  return (
    <div className="relative overflow-hidden">
      <Image src={imgPath} alt="" className=" z-10"></Image>
      <div className=" absolute w-full h-full overflow-hidden bg-black/50 backdrop-blur-md  z-20  p-2 rounded-md top-28 xl:top-52 hover:top-0 transition-all ">
        <h1 className="font-bold text-lg md:text-sm xl:text-lg h-max">
          {episode.episode_number}.{episode.name}
          <small className=" text-xs float-right">{duration}</small>
        </h1>
        <p className="font-bold">
          {episode.vote_average.toFixed(1)}/
          <small className=" font-extralight">10</small>
        </p>
        <p>{episode.air_date}</p>
        <p className="text-xs xl:text-base">{episode.overview}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
