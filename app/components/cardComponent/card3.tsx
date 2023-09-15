import React from "react";
import { Person, img_base_uri } from "@/app/api/fetchData";
import { Card, CardFooter, Image } from "@nextui-org/react";

type Props = {
  item: Person;
};

const Card3 = ({ item }: Props) => {
  return (
    <div>
      <Card isFooterBlurred radius="lg" className="border-none w-max">
        <Image
          alt="profile"
          className="object-cover h-52"
          src={`${img_base_uri}${item.profile_path}`}
        />
        <CardFooter className="flex flex-col py-1 absolute before:rounded-xl rounded-large bottom-1  shadow-small z-10 ">
          <p className="text-lg text-white/80 text-left">
            {item.original_name}
          </p>
          {item.character ? (
            <p className="text-tiny text-white/80">as {item.character}</p>
          ) : (
            <p className="text-tiny text-white/80"> {item.job}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Card3;
