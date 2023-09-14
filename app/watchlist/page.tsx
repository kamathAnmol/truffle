"use client";
import { selectCurrentUser, watchListInterface } from "@/store/root-reducer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Watchlist from "../components/watchlist/watchlist";
import { Divider } from "@nextui-org/react";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<watchListInterface | null>();

  const uid = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch("/api/getWatchList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });
      const data = await response.json();
      if (data.messege === "WatchList not found") {
        setWatchlist(null);
      } else setWatchlist(data.watchList);
    };
    fetchWatchlist();
  }, [uid]);

  if (uid === null) {
    return (
      <h1 className=" text-3xl font-bold mt-64 text-center">Please Login</h1>
    );
  } else
    return (
      <div className="w-3/4 mx-auto">
        {watchlist?.movieWatchList.length == 0 &&
        watchlist.tvWatchList.length == 0 ? (
          <h1 className=" text-3xl font-bold mt-64 text-center">
            Nothing here
          </h1>
        ) : (
          <div>
            {watchlist?.movieWatchList.length! > 0 && (
              <div>
                <h1 className=" font-bold text-xl my-4">Movies</h1>
                <Divider></Divider>
                <div className="flex flex-col gap-4 my-8">
                  {watchlist?.movieWatchList?.map((id) => {
                    return (
                      <Watchlist type={"movie"} id={id} key={id}></Watchlist>
                    );
                  })}
                </div>
              </div>
            )}
            {watchlist?.tvWatchList.length! > 0 && (
              <div>
                <h1 className=" font-bold text-xl my-4">Tv Shows</h1>
                <Divider></Divider>
                <div className="flex flex-col gap-4 my-8">
                  {watchlist?.tvWatchList?.map((id) => {
                    return <Watchlist type="tv" id={id} key={id}></Watchlist>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default WatchlistPage;
