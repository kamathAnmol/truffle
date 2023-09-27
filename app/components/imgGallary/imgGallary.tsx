import React, { useEffect, useRef, useState } from "react";
import { Button, Image } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./styles.scss";

type Props = {
  imgs: string[];
};

const ImgGallary = ({ imgs }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentImg, setCurrentImg] = useState<number>();
  const showImg = (img: number) => {
    setCurrentImg(img);
    onOpen();
  };
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginatonRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4 my-4">
        {imgs.map((img, index) => {
          return (
            <Image
              src={img}
              onClick={() => showImg(index)}
              loading="lazy"
              alt=""
              key={index}
            ></Image>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="5xl"
        className="p-2"
        classNames={{
          closeButton: "z-30",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="relative ">
                <div className="flex flex-col gap-4 ">
                  <div className=" flex gap-4 justify-between items-center relative w-full">
                    <Button
                      ref={(val) => (prevRef.current = val)}
                      className=" hidden md:flex"
                      isIconOnly
                      radius="full"
                      size="lg"
                    >
                      <ChevronLeft />
                    </Button>
                    <Swiper
                      modules={[Pagination, Navigation]}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      initialSlide={currentImg}
                      pagination={{
                        clickable: true,
                        el: paginatonRef.current,
                        dynamicBullets: true,
                      }}
                    >
                      {imgs.map((img) => (
                        <SwiperSlide>
                          <Image
                            src={img}
                            alt="image"
                            classNames={{ img: "max-h-[80vh]" }}
                          ></Image>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Button
                      ref={(val) => (nextRef.current = val)}
                      className="  hidden md:flex"
                      isIconOnly
                      radius="full"
                      size="lg"
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                  <div
                    ref={(val) => (paginatonRef.current = val)}
                    className="dynamic-bullets-container w-fit"
                  ></div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ImgGallary;
