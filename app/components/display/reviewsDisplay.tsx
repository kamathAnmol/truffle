import { reviewInterface } from "@/app/api/fetchData";
import React from "react";
import ReviewsCard from "../cardComponent/reviewsCard";

type Props = {
  reviews: reviewInterface[] | undefined;
};

const ReviesDisplay = ({ reviews }: Props) => {
  return (
    <div className="my-6 flex flex-col gap-4">
      {reviews?.map((review) => (
        <ReviewsCard review={review} key={review.id}></ReviewsCard>
      ))}
    </div>
  );
};

export default ReviesDisplay;
