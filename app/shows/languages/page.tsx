"use client";

import { detailsType, getByLanguages } from "@/app/api/fetchData";
import LongCard from "@/app/components/longCard/longCard";
import { langInterface, languagesSelector } from "@/store/root-reducer";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShowLanguages = () => {
  const { languages } = useSelector(languagesSelector);
  const [selected, setSelected] = useState("en");
  const [data, setData] = useState<detailsType[]>();
  const getData = async () => {
    const list = await getByLanguages("tv", selected);
    setData(list);
  };
  useEffect(() => {
    getData();
  }, [selected]);
  return (
    <div>
      <div className="w-11/12 md:w-3/4 mx-auto flex gap-8 flex-col mt-20">
        {data?.map((item) => {
          return <LongCard item={item} key={item.id}></LongCard>;
        })}
      </div>
      <div className="w-full p-4 flex justify-center fixed top-16 bg-black/60 backdrop-blur-lg border-y-gray z-50">
        <Select
          label="Select The Language"
          className="w-11/12 md:w-2/5"
          size="sm"
          variant="bordered"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          showScrollIndicators
          defaultSelectedKeys={"en"}
        >
          {languages.map((language: langInterface) => {
            return (
              <SelectItem
                value={language.iso_639_1}
                key={language.iso_639_1}
                startContent={language.iso_639_1}
              >
                {language.english_name}
              </SelectItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default ShowLanguages;
