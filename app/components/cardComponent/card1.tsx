import { detailsType, img_base_uri } from "@/app/api/fetchData";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

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
        className="h-full"
        style={{ maxWidth: "250px" }}
      >
        <CardHeader>
          <Image
            alt="poster"
            src={imgPath}
            shadow="sm"
            className="object-cover w-full max-h-96"
            style={{
              aspectRatio: "9/16",
            }}
          ></Image>
        </CardHeader>
        <CardBody className=" overflow-y-hidden">
          <div className="flex flex-row gap-1 justify-between w-full">
            <h1>{item.title || item.name}</h1>
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
