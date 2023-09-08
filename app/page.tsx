"use client";

import { MediaItem, getAllTrending } from "@/app/api/fetchData";
import Carousel from "@/app/components/carousel/carousel";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { authState, createUserDoc } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/root-reducer";

export default function Home() {
  const [allTrending, setAllTrending] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data = await getAllTrending();
      setAllTrending(data);
      setIsLoading(false);
    };
    const unsub = authState((user) => {
      if (user) {
        createUserDoc(user);
      }
      dispatch(setCurrentUser(user ? user : null));
    });
    getData();
  }, []);
  if (isLoading) {
    return (
      <CircularProgress
        aria-label="Loading..."
        className="w-full h-full m-auto mt-44"
      />
    );
  } else {
    return (
      <div className="home-container">
        <Carousel data={allTrending}></Carousel>
      </div>
    );
  }
}
