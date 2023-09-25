import { Button, Image } from "@nextui-org/react";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4 my-4">
        {imgs.map((img, index) => {
          return (
            <div>
              <Image
                src={img}
                onClick={() => showImg(index)}
                loading="lazy"
                alt=""
                key={index}
              ></Image>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    radius="full"
                    isIconOnly
                    onPress={() => setCurrentImg(currentImg! - 1)}
                    isDisabled={currentImg === 0}
                  >
                    <ChevronLeft />
                  </Button>
                  <Image
                    src={imgs[currentImg!]}
                    className="p-8 rounded-md "
                    style={{ maxHeight: "800px" }}
                    alt=""
                  ></Image>
                  <Button
                    variant="ghost"
                    radius="full"
                    isIconOnly
                    onPress={() => setCurrentImg(currentImg! + 1)}
                    isDisabled={currentImg === imgs.length - 1}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImgGallary;
