import { Season, img_base_uri } from "@/app/api/fetchData";
import { Accordion, AccordionItem, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  seasons: Season[] | undefined;
  id: number | undefined;
};

const Display4 = ({ seasons, id }: Props) => {
  return (
    <div>
      <Accordion variant="splitted">
        {seasons!.map((season, index) => {
          return (
            <AccordionItem
              key={index}
              aria-label={season.name}
              title={season.name}
            >
              <div
                className="md:grid md:p-4 md:gap-7"
                style={{
                  gridTemplateColumns: "3fr 7fr",
                }}
              >
                <Image
                  src={`${img_base_uri}${season.poster_path}`}
                  alt="poster"
                ></Image>
                <div className="flex flex-col gap-4">
                  <h1 className="font-bold text-xl">
                    {season.name}
                    &nbsp;
                    {season.season_number && (
                      <small>({season.season_number})</small>
                    )}
                  </h1>
                  <p className="font-bold">
                    {season.episode_count > 1
                      ? `${season.episode_count} Episodes`
                      : `${season.episode_count} Episode`}
                  </p>
                  <p>{season.overview}</p>
                  <Link href={`${id}/${season.season_number}`}>
                    <Button
                      variant="bordered"
                      color="warning"
                      className="w-1/3"
                    >
                      Deatils
                    </Button>
                  </Link>
                </div>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Display4;
