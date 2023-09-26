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
import { useEffect, useRef, useState } from "react";

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
  const [prevState, setPrevState] = useState<HTMLButtonElement | undefined>();
  useEffect(() => {
    if (prevRef.current) setPrevState(prevRef.current);
  }, [prevRef.current]);

  const { list } = props;
  const swiperProps: lazyProps = {
    modules: [Navigation, Autoplay, Virtual, Pagination],
    spaceBetween: 10,

    slidesPerGroup: 3,
    navigation: {
      nextEl: nextRef.current,
      prevEl: prevState,
    },
    virtual: true,
    preloadImages: false,
    lazy: true,
    pagination: {
      clickable: true,
      el: paginatonRef.current,
    },

    breakpoints: {
      240: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <div className="relative w-full">
      <div className=" px-3 md:p-8 w-full mx-auto relative flex items-center">
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
          className=" hidden md:flex"
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
        className="bullets-container bg-black/40 px-4 rounded-3xl py-1"
      ></div>
    </div>
  );
};

export default Display1;
