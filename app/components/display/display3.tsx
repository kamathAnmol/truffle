import { Person } from "@/app/api/fetchData";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
const Display3 = (props: props) => {
  const { list } = props;

  return (
    <div className="p-8">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, Virtual]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        virtual
        preloadImages={false}
        lazy={true}
      >
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
