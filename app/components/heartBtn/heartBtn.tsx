import React, { useEffect } from "react";
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
  active: boolean;
  type: string;
  id: string;
}

const HeartBtn = (props: props) => {
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
      const dataWatchList: watchListInterface = data.watchList;
      if (dataWatchList === null) {
        const newWatchlist: watchListInterface = {
          uid: user!,
          movieWatchList: [],
          tvWatchList: [],
        };
        dispatch(setWatchlist(newWatchlist));
        console.log(watchList);
      } else {
        dispatch(setWatchlist(dataWatchList));
      }
    };
    getWatchList();
  }, [user, dispatch, watchList]);
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
    let updatedWatchList = { ...watchList }; // Create a shallow copy
    if (props.type === "movie") {
      updatedWatchList = {
        ...updatedWatchList,
        movieWatchList: [...updatedWatchList.movieWatchList, props.id],
      };
    } else if (props.type === "tv") {
      updatedWatchList = {
        ...updatedWatchList,
        tvWatchList: [...updatedWatchList.tvWatchList, props.id],
      };
    }
    dispatch(setWatchlist(updatedWatchList));
  };

  const removeWatchlist = () => {
    let updatedWatchList = { ...watchList }; // Create a shallow copy
    if (props.type === "movie") {
      updatedWatchList = {
        ...updatedWatchList,
        movieWatchList: updatedWatchList.movieWatchList.filter(
          (id) => id !== props.id
        ),
      };
    } else if (props.type === "tv") {
      updatedWatchList = {
        ...updatedWatchList,
        tvWatchList: updatedWatchList.tvWatchList.filter(
          (id) => id !== props.id
        ),
      };
    }
    dispatch(setWatchlist(updatedWatchList));
  };

  return (
    <>
      {props.active && (
        <Image {...heartActive} alt="" onClick={removeWatchlist} />
      )}
      {!props.active && (
        <Image {...heartInactive} onClick={addWatchlist} alt="" />
      )}
    </>
  );
};

export default HeartBtn;
