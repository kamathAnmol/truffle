import { Person } from "@/app/api/fetchData";
import React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Virtual,
  Lazy,
} from "swiper/modules";
import Card3 from "../cardComponent/card3";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
interface props {
  list: Person[] | undefined;
}
interface lazyProps extends SwiperProps {
  preloadImages: boolean;
  lazy: boolean;
}
const Display3 = (props: props) => {
  const { list } = props;
  const swiperProps: lazyProps = {
    modules: [Navigation, Pagination, Autoplay, Virtual],
    spaceBetween: 10,
    slidesPerView: 5,
    navigation: true,
    pagination: { clickable: true },
    virtual: true,
    preloadImages: false,
    lazy: true,
  };

  return (
    <div className="p-8">
      <Swiper {...swiperProps}>
        {list?.map((item, index) => {
          return (
            <SwiperSlide key={index} virtualIndex={index} className="h-max">
              <Card3 item={item} key={item.id}></Card3>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Display3;
