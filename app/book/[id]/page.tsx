import React from "react";

type Props = {};

const BookPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <div>{id}</div>;
};

export default BookPage;
