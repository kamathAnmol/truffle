import { videosInterface } from "@/app/api/fetchData";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image,
  Button,
} from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  videos: videosInterface[] | undefined;
};

const VideoGallary = ({ videos }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentVideo, setCurrentVideo] = useState<number>();
  const showVideo = (img: number) => {
    setCurrentVideo(img);
    onOpen();
  };
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4 my-4">
        {videos?.map((video, index) => (
          <Image
            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
            onClick={() => showVideo(index)}
            loading="lazy"
            alt=""
          ></Image>
        ))}
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
                    onPress={() => setCurrentVideo(currentVideo! - 1)}
                    isDisabled={currentVideo === 0}
                  >
                    <ChevronLeft />
                  </Button>
                  <iframe
                    height={600}
                    width={1500}
                    src={`https://www.youtube.com/embed/${
                      videos![currentVideo!]?.key
                    }`}
                    className=" rounded-md p-8"
                    allowFullScreen
                  ></iframe>
                  <Button
                    variant="ghost"
                    radius="full"
                    isIconOnly
                    onPress={() => setCurrentVideo(currentVideo! + 1)}
                    isDisabled={currentVideo === videos!.length - 1}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VideoGallary;
