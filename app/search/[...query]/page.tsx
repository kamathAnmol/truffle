"use client";
import React, { useEffect, useState } from "react";
import { search, MediaItem } from "@/app/api/fetchData";
import { RadioGroup, Radio, cn, RadioProps } from "@nextui-org/react";
import "./styles.scss";
import LongCard from "@/app/components/longCard/longCard";

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
const HorizontalCustomRadio = (props: RadioProps) => {
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

const SearchPage = ({ params }: { params: { query: string } }) => {
  type valueType = "movie" | "tv" | "person" | "multi";
  const [selected, setSelected] = useState<"movie" | "tv" | "person" | "multi">(
    "multi"
  );
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const query = new String(params.query).replace("%20", " ");
  useEffect(() => {
    const updateSearch = async () => {
      const data: MediaItem[] = await search(selected, query);
      if (selected === "multi") {
        setSearchResults(data);
      } else {
        data.map((item) => {
          item.media_type = selected;
        });
        setSearchResults(data);
      }
    };
    updateSearch();
  }, [selected, query]);
  const resetScroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className=" mx-auto w-10/12 search-container block md:grid py-16">
      <RadioGroup
        label="Select Category"
        value={selected}
        onValueChange={(value) => {
          resetScroll();
          setSelected(value as valueType);
        }}
        defaultValue="multi"
        className="fixed w-1/5 hidden md:block"
      >
        <VerticalCustomRadio value="multi">All</VerticalCustomRadio>
        <VerticalCustomRadio value="movie">Movies</VerticalCustomRadio>
        <VerticalCustomRadio value="tv">Tv Shows</VerticalCustomRadio>
        <VerticalCustomRadio value="person">Person</VerticalCustomRadio>
      </RadioGroup>
      <RadioGroup
        label="Select Category"
        value={selected}
        onValueChange={(value) => {
          setSelected(value as valueType);
        }}
        defaultValue="multi"
        orientation="horizontal"
        className=" w-full block md:hidden fixed bg-black/80  backdrop-blur-lg  top-16 py-6"
      >
        <HorizontalCustomRadio value="multi">All</HorizontalCustomRadio>
        <HorizontalCustomRadio value="movie">Movies</HorizontalCustomRadio>
        <HorizontalCustomRadio value="tv">Tv Shows</HorizontalCustomRadio>
        <HorizontalCustomRadio value="person">Person</HorizontalCustomRadio>
      </RadioGroup>
      <div className="h-16"></div>
      {selected === "multi" && (
        <div>
          <h1 className=" capitalize font-bold text-4xl my-7">All</h1>
          <div className="flex flex-col gap-3">
            {searchResults.map((item) => {
              return <LongCard item={item} key={item.id}></LongCard>;
            })}
          </div>
        </div>

        // <div>
        //   {searchResults.filter((item) => item.media_type === "movie").length >
        //     0 && (
        //     <>
        //       <h1 className=" capitalize font-bold text-4xl my-7">Movies</h1>
        //       <div className="flex flex-col gap-3">
        //         {searchResults
        //           .filter((item) => item.media_type === "movie")
        //           .map((item) => {
        //             return <LongCard item={item} key={item.id}></LongCard>;
        //           })}
        //       </div>
        //     </>
        //   )}
        //   {searchResults.filter((item) => item.media_type === "tv").length >
        //     0 && (
        //     <>
        //       <h1 className=" capitalize font-bold text-4xl my-7">Tv Shows</h1>
        //       <div className="flex flex-col gap-3">
        //         {searchResults
        //           .filter((item) => item.media_type === "tv")
        //           .map((item) => {
        //             return <LongCard item={item} key={item.id}></LongCard>;
        //           })}
        //       </div>
        //     </>
        //   )}
        //   {searchResults.filter((item) => item.media_type === "person").length >
        //     0 && (
        //     <>
        //       <h1 className=" capitalize font-bold text-4xl my-7">People</h1>
        //       <div className="flex flex-col gap-3">
        //         {searchResults
        //           .filter((item) => item.media_type === "person")
        //           .map((item) => {
        //             return <LongCard item={item} key={item.id}></LongCard>;
        //           })}
        //       </div>
        //     </>
        //   )}
        // </div>
      )}
      {selected === "movie" && (
        <div>
          <h1 className=" capitalize font-bold text-4xl my-7">Movies</h1>
          <div className="flex flex-col gap-3">
            {searchResults.map((item) => {
              return <LongCard item={item} key={item.id}></LongCard>;
            })}
          </div>
        </div>
      )}
      {selected === "tv" && (
        <div>
          <h1 className=" capitalize font-bold text-4xl my-7">Tv Shows</h1>
          <div className="flex flex-col gap-3">
            {searchResults.map((item) => {
              return <LongCard item={item} key={item.id}></LongCard>;
            })}
          </div>
        </div>
      )}
      {selected === "person" && (
        <div>
          <h1 className=" capitalize font-bold text-4xl my-7">People</h1>
          <div className="flex flex-col gap-3">
            {searchResults.map((item) => {
              return <LongCard item={item} key={item.id}></LongCard>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
