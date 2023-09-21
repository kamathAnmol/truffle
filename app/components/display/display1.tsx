import { detailsType } from "@/app/api/fetchData";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules";
import Card1 from "../cardComponent/card1";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface props {
  list: detailsType[];
}
interface lazyProps extends SwiperProps {
  preloadImages: boolean;
  lazy: boolean;
}
const Display1 = (props: props) => {
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
    <div className="p-8 w-11/12 mx-auto">
      <Swiper {...swiperProps}>
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
