import { detailsType } from "@/app/api/fetchData";
import React from "react";
import Card1 from "../cardComponent/card1";

type Props = {
  list: detailsType[] | undefined;
  type: string;
};

const Display2 = ({ list, type }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {list?.map((item) => {
        item.media_type = type;
        return <Card1 item={item} key={item.id}></Card1>;
      })}
    </div>
  );
};

export default Display2;
