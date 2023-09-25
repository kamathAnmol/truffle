import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { detailsType, img_base_uri } from "@/app/api/fetchData";
import { Button, Image, Progress } from "@nextui-org/react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface props {
  list: detailsType[];
}

const SwiperComponent = ({ list }: props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginatonRef = useRef(null);

  return (
    <div className="relative">
      <Button
        ref={prevRef}
        className="absolute top-1/3 z-50 left-8"
        isIconOnly
        variant="flat"
        radius="full"
        size="lg"
      >
        <ChevronLeft />
      </Button>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1.7}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        centeredSlides={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={true}
        pagination={{
          clickable: true,
          el: paginatonRef.current,
          type: "bullets",
        }}
      >
        {list.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Link href={`/details/${item.media_type}/${item.id}`}>
                <div>
                  <Image
                    src={`${img_base_uri}${item.backdrop_path}`}
                    alt="backdrop"
                    className="-z-10"
                  ></Image>
                </div>
                <div className="absolute w-full bottom-0 flex pb-4  px-4 md:px-8 md:pb-8 gradient">
                  <div className=" w-1/4">
                    <Image
                      src={`${img_base_uri}${item.poster_path}`}
                      className="w-full h-24 md:h-80 xl:h-96"
                      alt="poster"
                    />
                  </div>
                  <div className="w-4/6 gap-5 self-end ml-4">
                    <h1 className="font-bold text-lg md:text-xl  xl:text-3xl">
                      {item.title || item.name}
                    </h1>
                    <div className=" w-2/6 py-3 hidden md:block">
                      <Progress
                        color="primary"
                        aria-label="Rating"
                        value={item.vote_average * 10}
                        showValueLabel
                        size="sm"
                      />
                    </div>
                    <p className="text-clip hidden md:block">{item.overview}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        ref={paginatonRef}
        className="w-fit flex gap-1 md:gap-4 mx-auto"
      ></div>
      <Button
        ref={nextRef}
        className="absolute top-1/3 z-50 right-8"
        isIconOnly
        variant="flat"
        radius="full"
        size="lg"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
export default SwiperComponent;
