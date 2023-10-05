import { Person } from "@/app/api/fetchData";
import React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules";
import Card3 from "../cardComponent/card3";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css/pagination";

interface props {
  list: Person[] | undefined;
}
interface lazyProps extends SwiperProps {
  preloadImages: boolean;
  lazy: boolean;
}
const Display3 = (props: props) => {
  const { list } = props;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginatonRef = useRef(null);
  const [prevState, setPrevState] = useState<HTMLButtonElement | undefined>();
  const swiperProps: lazyProps = {
    modules: [Navigation, Autoplay, Virtual, Pagination],
    spaceBetween: 10,
    slidesPerView: 5,
    navigation: {
      nextEl: nextRef.current,
      prevEl: prevState,
    },
    virtual: true,
    preloadImages: false,
    lazy: true,
    pagination: {
      el: paginatonRef.current,
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      240: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1650: {
        slidesPerView: 5,
      },
    },
  };
  useEffect(() => {
    if (prevRef.current) setPrevState(prevRef.current);
  }, []);

  return (
    <div>
      <div className="xl:p-8 md:p-4 px-0 py-4 relative flex items-center gap-3">
        <Button
          ref={prevRef}
          className=" hidden md:flex"
          isIconOnly
          variant="flat"
          radius="full"
          size="lg"
        >
          <ChevronLeft />
        </Button>
        <Swiper {...swiperProps}>
          {list?.map((item, index) => {
            return (
              <SwiperSlide key={index} virtualIndex={index} className="h-max">
                <Card3 item={item} key={item.id}></Card3>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Button
          ref={nextRef}
          className=" hidden md:flex"
          isIconOnly
          variant="flat"
          radius="full"
          size="lg"
        >
          <ChevronRight />
        </Button>
      </div>
      <div ref={paginatonRef} className="dynamic-bullets-container"></div>
    </div>
  );
};

export default Display3;
