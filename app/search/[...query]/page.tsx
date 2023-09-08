"use client";
import React, { useEffect, useState } from "react";
import { search, MediaItem } from "@/app/api/fetchData";
import { RadioGroup, Radio, cn, RadioProps } from "@nextui-org/react";
import "./styles.scss";
import LongCard from "@/app/components/longCard/longCard";

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const SearchPage = ({ params }: { params: { query: string } }) => {
  const [selected, setSelected] = useState("multi");
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const query = params.query;
  useEffect(() => {
    const updateSearch = async () => {
      setSearchResults(await search(selected, query));
    };
    updateSearch();
  }, [selected]);
  return (
    <div className=" mx-auto w-10/12 search-container grid ">
      <RadioGroup
        label="Select Category"
        value={selected}
        onValueChange={setSelected}
        defaultValue="multi"
        className="fixed w-1/5"
      >
        <CustomRadio value="multi">All</CustomRadio>
        <CustomRadio value="movie">Movies</CustomRadio>
        <CustomRadio value="tv">Tv Shows</CustomRadio>
        <CustomRadio value="person">Person</CustomRadio>
      </RadioGroup>
      <div></div>
      {selected === "multi" && (
        <div>
          {searchResults.filter((item) => item.media_type === "movie").length >
            0 && (
            <>
              <h1 className=" capitalize font-bold text-4xl my-7">Movies</h1>
              <div className="flex flex-col gap-3">
                {searchResults
                  .filter((item) => item.media_type === "movie")
                  .map((item) => {
                    return <LongCard item={item}></LongCard>;
                  })}
              </div>
            </>
          )}
          {searchResults.filter((item) => item.media_type === "tv").length >
            0 && (
            <>
              <h1 className=" capitalize font-bold text-4xl my-7">Tv Shows</h1>
              <div className="flex flex-col gap-3">
                {searchResults
                  .filter((item) => item.media_type === "tv")
                  .map((item) => {
                    return <LongCard item={item}></LongCard>;
                  })}
              </div>
            </>
          )}
          {searchResults.filter((item) => item.media_type === "person").length >
            0 && (
            <>
              <h1 className=" capitalize font-bold text-4xl my-7">People</h1>
              <div className="flex flex-col gap-3">
                {searchResults
                  .filter((item) => item.media_type === "person")
                  .map((item) => {
                    return <LongCard item={item}></LongCard>;
                  })}
              </div>
            </>
          )}
        </div>
      )}
      {selected === "movie" && <div>Movies</div>}
      {selected === "tv" && <div>Shows</div>}
      {selected === "person" && <div>Persons</div>}
    </div>
  );
};

export default SearchPage;
