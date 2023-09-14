import { detailsType } from "@/app/api/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Virtual,
} from "swiper/modules";
import Card1 from "../cardComponent/card1";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface props {
  list: detailsType[];
}
const Display1 = (props: props) => {
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
      >
        {list.map((item, index) => {
          return (
            <SwiperSlide key={index} virtualIndex={index} className="h-max">
              <Card1 item={item}></Card1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Display1;
