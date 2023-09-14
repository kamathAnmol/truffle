"use client";
import {
  detailsType,
  fetchByGenre,
  fetchGenres,
  genreInterface,
} from "@/app/api/fetchData";
import Display2 from "@/app/components/display/display2";
import {
  Button,
  Radio,
  RadioGroup,
  RadioProps,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const VerticalCustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary z-100"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const MovieGenre = () => {
  const [genres, setGenres] = useState<genreInterface[]>();
  const [selected, setSelected] = useState("28");
  const [movies, setMovies] = useState<detailsType[]>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getMovies = async () => {
    const data = await fetchByGenre("movie", selected);
    setMovies(data);
  };
  useEffect(() => {
    const fetchGens = async () => {
      const data = await fetchGenres();
      setGenres(data.movie);
      getMovies();
    };
    fetchGens();
  }, [getMovies]);
  useEffect(() => {
    getMovies();
  }, [selected, getMovies]);
  return (
    <div
      style={{ gridTemplateColumns: "3fr 9fr" }}
      className="md:grid w-full md:w-11/12 mx-auto "
    >
      <RadioGroup
        label="Select Genre"
        value={selected}
        onValueChange={setSelected}
        defaultValue="28"
        className=" w-full hidden md:block  bg-black/80  backdrop-blur-lg  py-6 overflow-y-scroll no-scroll-bar"
      >
        {genres?.map((genre) => (
          <VerticalCustomRadio value={genre.id.toString()} key={genre.id}>
            {genre.name}
          </VerticalCustomRadio>
        ))}
      </RadioGroup>
      <div className="mt-16">
        <Display2 list={movies} type="movie"></Display2>
      </div>
      <div className="md:hidden w-full fixed top-16 bg-black/80 backdrop-blur-xl flex justify-center">
        <Button className=" my-4" onPress={onOpen}>
          Change Genre
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Select Genre
                </ModalHeader>
                <ModalBody>
                  <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    defaultValue="28"
                    className=" "
                    onChange={onClose}
                  >
                    {genres?.map((genre) => (
                      <Radio value={genre.id.toString()} key={genre.id}>
                        {genre.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default MovieGenre;
