import React, { useEffect, useState } from "react";
import heartActive from "@/public/assests/heart/heart-active.svg";
import heartInactive from "@/public/assests/heart/heart-inactive.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  setWatchlist,
  watchListInterface,
  watchListSelector,
} from "@/store/root-reducer";
import { Image } from "@nextui-org/react";

interface props {
  type: string;
  id: string;
}

const HeartBtn = ({ type, id }: props) => {
  const [active, setActive] = useState<boolean>();
  const watchList = useSelector(watchListSelector);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const getWatchList = async () => {
      const response = await fetch("/api/getWatchList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: user }),
      });
      const data = await response.json();
      const dataWatchList = data.watchList;

      if (dataWatchList === null) {
        const newWatchlist = {
          uid: user!,
          movieWatchList: [],
          tvWatchList: [],
        };
        dispatch(setWatchlist(newWatchlist));
      } else {
        dispatch(setWatchlist(dataWatchList));
      }
    };

    if (user && !watchList.uid) {
      getWatchList();
    }

    if (type === "movie" && watchList.movieWatchList.includes(id)) {
      setActive(true);
    } else if (type === "tv" && watchList.tvWatchList.includes(id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [user, dispatch, watchList, id, type]);

  useEffect(() => {
    const updateWatchList = async () => {
      const response = await fetch("/api/updateWatchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchList),
      });
    };
    updateWatchList();
  }, [watchList]);

  const addWatchlist = () => {
    let updatedWatchList = { ...watchList };
    if (type === "movie") {
      updatedWatchList = {
        ...updatedWatchList,
        movieWatchList: [...updatedWatchList.movieWatchList, id],
      };
    } else if (type === "tv") {
      updatedWatchList = {
        ...updatedWatchList,
        tvWatchList: [...updatedWatchList.tvWatchList, id],
      };
    }
    dispatch(setWatchlist(updatedWatchList));
  };

  const removeWatchlist = () => {
    let updatedWatchList = { ...watchList }; // Create a shallow copy
    if (type === "movie") {
      setActive(false);
      updatedWatchList = {
        ...updatedWatchList,
        movieWatchList: updatedWatchList.movieWatchList.filter(
          (movieid) => movieid !== id
        ),
      };
    } else if (type === "tv") {
      setActive(false);
      updatedWatchList = {
        ...updatedWatchList,
        tvWatchList: updatedWatchList.tvWatchList.filter((tvId) => tvId !== id),
      };
    }
    dispatch(setWatchlist(updatedWatchList));
  };

  return (
    <>
      {active && <Image {...heartActive} alt="" onClick={removeWatchlist} />}
      {!active && <Image {...heartInactive} onClick={addWatchlist} alt="" />}
    </>
  );
};

export default HeartBtn;
