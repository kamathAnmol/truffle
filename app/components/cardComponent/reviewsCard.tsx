import { img_base_uri, reviewInterface } from "@/app/api/fetchData";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import noUserSvg from "@/public/assests/no-image.svg";
import { User2 } from "lucide-react";
type Props = {
  review: reviewInterface;
};

const ReviewsCard = ({ review }: Props) => {
  const date = new Date(review.created_at);
  const displayDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return (
    <div>
      <Card className="w-[98%] md:w-[90%] mx-auto">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              color="primary"
              radius="full"
              size="md"
              src={`${img_base_uri}${review.author_details.avatar_path}`}
              showFallback
              fallback={<User2 color="#3b3b3b" strokeWidth={2} size={30} />}
              classNames={{
                base: "bg-white",
              }}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {review.author}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {review.author_details.username}
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{review.content}</p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              Created on
            </p>
            <p className=" text-default-400 text-small">{displayDate}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewsCard;
