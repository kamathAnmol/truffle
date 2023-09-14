import { genreInterface } from "@/app/api/fetchData";
import { Card, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  genre: genreInterface;
};

const Card2 = ({ genre }: Props) => {
  return (
    <Link href={"/movies/genres"} className="w-1/4">
      <Card isBlurred isPressable>
        <CardHeader>
          <h1 className="font-bold text-lg text-clip w-max h-max">
            {genre.name}
          </h1>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default Card2;
