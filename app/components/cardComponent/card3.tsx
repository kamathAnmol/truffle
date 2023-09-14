import React from "react";
import { Person, img_base_uri } from "@/app/api/fetchData";
import { Card, CardFooter, Image } from "@nextui-org/react";

type Props = {
  item: Person;
};

const Card3 = ({ item }: Props) => {
  return (
    <div>
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt="profile"
          className="object-cover"
          height={250}
          src={`${img_base_uri}${item.profile_path}`}
          width={200}
        />
        <CardFooter className="flex flex-col py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 ">
          <p className="text-lg text-white/80 text-left">
            {item.original_name}
          </p>
          <p className="text-tiny text-white/80">as {item.character}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Card3;
