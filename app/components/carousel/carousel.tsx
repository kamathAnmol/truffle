import React, { useCallback } from "react";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import "./carousel.styles.scss";
import { MediaItem } from "@/app/api/fetchMovieData";
// import imageByIndex from "./imageByIndex";

type PropType = {
  data: MediaItem[];
};

const Carousel: React.FC<PropType> = (props) => {
  const { data } = props;
  const SLIDE_COUNT = 9;
  const slides: number[] = Array.from(Array(SLIDE_COUNT).keys());
  const emblaOptions: EmblaOptionsType = { loop: true };

  const dataByIndex = (index: number): MediaItem => data[index % data.length];
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [Autoplay()]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onButtonClick);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => {
            return (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={`https://image.tmdb.org/t/p/original${
                    dataByIndex(index).backdrop_path
                  }`}
                  alt="HomeCarousel"
                />
                <div className="info absolute bottom-0 w-full card-styles">
                  <div className=" flex flex-row justify-start items-end  w-full gap-8">
                    <img
                      alt="Card background"
                      className=" rounded-xl card-img ml-5"
                      src={`https://image.tmdb.org/t/p/original${
                        dataByIndex(index).poster_path
                      }`}
                    />
                    <div className=" gap-4 grid-flow-row grid">
                      <h4 className="font-bold  text-sm xl:text-xl ">
                        {dataByIndex(index).title || dataByIndex(index).name}
                      </h4>
                      <p className=" text-clip hidden xl:block ">
                        {dataByIndex(index).overview.substring(0, 200)}...
                      </p>
                      <p>
                        <span className=" font-bold text-lg">
                          {dataByIndex(index).vote_average.toFixed(1)}
                        </span>
                        /10
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__buttons hidden xl:block">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="embla__dots ">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
