import { detailsType } from "@/app/api/fetchData";
import React, { RefObject, useRef } from "react";
import Card1 from "../cardComponent/card1";
import { Button, ScrollShadow } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface props {
  list: detailsType[];
}
const Display1 = (props: props) => {
  const { list } = props;
  const scrollRef = useRef(null);
  const scroll = (
    direction: "right" | "left",
    ref?: RefObject<HTMLDivElement>
  ) => {
    if (ref?.current) {
      if (direction === "left") {
        ref.current.scrollBy({
          left: -500,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollBy({
          left: 500,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <div style={{ width: "96%" }} className="mx-auto   ">
      <ScrollShadow
        className=" overflow-x-scroll  flex  gap-4 p-6 no-scroll-bar snap-x h-max"
        ref={scrollRef}
      >
        {list.map((item) => {
          return <Card1 item={item} key={item.id}></Card1>;
        })}
      </ScrollShadow>
      <div className="w-full  justify-between hidden md:flex">
        <Button
          variant="light"
          color="primary"
          className=" rounded-full"
          onClick={() => {
            scroll("left", scrollRef);
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="light"
          color="primary"
          className=" rounded-full"
          onClick={() => {
            scroll("right", scrollRef);
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Display1;
