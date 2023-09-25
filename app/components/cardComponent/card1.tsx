import { detailsType, img_base_uri } from "@/app/api/fetchData";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import "./styles.scss";
interface props {
  item: detailsType;
}

const Card1 = (props: props) => {
  const { item } = props;
  const imgPath = `${img_base_uri}${item.poster_path || item.profile_path}`;
  return (
    <Link
      href={`/details/${item.media_type}/${item.id}`}
      className=" snap-center min-w-max md:min-w-fit mx-auto "
    >
      <Card
        isPressable
        isBlurred
        shadow="sm"
        className="relative w-36 md:w-48 xl:w-60"
        style={{ maxWidth: "250px" }}
      >
        <CardHeader className="relative">
          <Image
            alt="poster"
            src={imgPath}
            shadow="sm"
            className="object-cover w-full h-44 md:h-56 xl:h-80"
          ></Image>
        </CardHeader>
        <CardBody className=" overflow-y-hidden">
          <div className="flex flex-row gap-1 justify-between w-full ">
            <h1 className="text-slide ">{item.title || item.name}</h1>
            <p>
              {item.vote_average.toFixed(1)}
              <small>/10</small>
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Card1;
