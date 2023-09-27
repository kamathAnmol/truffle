import React from "react";
import { Person, img_base_uri } from "@/app/api/fetchData";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  item: Person;
};

const Card3 = ({ item }: Props) => {
  return (
    <Link href={`/details/person/${item.id}`}>
      <Card isFooterBlurred radius="lg" className="border-none flex">
        <Image
          alt="profile"
          className="object-cover w-fit max-h-44 md:max-h-56 xl:max-h-80  mx-auto"
          classNames={{
            wrapper: "mx-auto mt-3",
          }}
          src={
            item.profile_path !== null
              ? `${img_base_uri}${item.profile_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`
          }
        />
        <CardFooter className="flex flex-col py-1  before:rounded-xl rounded-large  shadow-small z-10 ">
          <p className="text-lg text-white/80 text-center">
            {item.original_name}
          </p>
          {item.character ? (
            <p className="text-tiny text-white/80">as {item.character}</p>
          ) : (
            <p className="text-tiny text-white/80"> {item.job}</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Card3;
