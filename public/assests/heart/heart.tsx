import React from "react";
import heartActive from "./heart-active.svg";
import heartInactive from "./heart-inactive.svg";

interface props {
  active: boolean;
}
const HeartSVG = (props: props) => {
  if (props.active) return heartActive;
  else return heartInactive;
};

export default HeartSVG;
