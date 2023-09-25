import { detailsType } from "@/app/api/fetchData";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Virtual } from "swiper/modules";
import Card1 from "../cardComponent/card1";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useRef } from "react";

interface props {
  list: detailsType[];
}
interface lazyProps extends SwiperProps {
  preloadImages: boolean;
  lazy: boolean;
}
const Display1 = (props: props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginatonRef = useRef(null);
  const { list } = props;
  const swiperProps: lazyProps = {
    modules: [Navigation, Autoplay, Virtual, Pagination],
    spaceBetween: 10,
    slidesPerView: 5,
    slidesPerGroup: 3,
    navigation: {
      nextEl: nextRef.current,
      prevEl: prevRef.current,
    },
    virtual: true,
    preloadImages: false,
    lazy: true,
    pagination: {
      clickable: true,
      el: paginatonRef.current,
      type: "bullets",
    },

    breakpoints: {
      240: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <div className="relative">
      <div className="md:p-8 w-full mx-auto relative flex items-center">
        <Button
          ref={prevRef}
          className=""
          isIconOnly
          variant="flat"
          radius="full"
          size="lg"
        >
          <ChevronLeft />
        </Button>
        <Swiper {...swiperProps}>
          {list.map((item, index) => {
            return (
              <SwiperSlide key={index} virtualIndex={index} className="h-max">
                <Card1 item={item}></Card1>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Button
          ref={nextRef}
          className=""
          isIconOnly
          variant="flat"
          radius="full"
          size="lg"
        >
          <ChevronRight />
        </Button>
      </div>
      <div
        ref={paginatonRef}
        className="flex gap-1 md:gap-4 mx-auto w-fit"
      ></div>
    </div>
  );
};

export default Display1;
