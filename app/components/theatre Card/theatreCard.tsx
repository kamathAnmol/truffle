"use client";
import { thetreInterface } from "@/app/book/[id]/page";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  item: thetreInterface;
  date: string;
  movie: string;
};

interface seatsInterface {
  platinum: string[];
  gold: string[];
  silver: string[];
}
export interface showsInterface {
  _id: string;
  theatre: string;
  movie: string;
  date: string;
  time: string;
  booked_seats: seatsInterface;
}

export interface bookInterface {
  show: string;
  movie: string;
  user: string;
  date: string;
  time: string;
  seats: {
    silver: string[];
    gold: string[];
    platinum: string[];
  };
  _id?: string;
}
export interface userInterface {
  _id: string;
}

import "./theatreCardStyles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/root-reducer";
const TheatreCard = ({ item, date, movie }: Props) => {
  const [time, setTime] = useState<string>("");
  const [qunatityModal, setqunatityModal] = useState<boolean>(false);
  const [seatsModal, setSeatsModal] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [show, setShow] = useState<showsInterface>();
  const [seats, setSeats] = useState<seatsInterface>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [status, setStatus] = useState<any>();
  const user = useSelector(selectCurrentUser);
  const emptySeats: seatsInterface = {
    silver: [],
    gold: [],
    platinum: [],
  };
  const [selectedSeats, setSelectedSeats] =
    useState<seatsInterface>(emptySeats);
  useEffect(() => {
    const getShow = async () => {
      const reqBody = {
        theatre: item._id,
        movie,
        date,
        time,
      };
      const response = await fetch("/api/getShows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...reqBody }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setShow(data);
      } else console.log("error");
    };
    getShow();
    // eslint-disable-next-line
  }, [time, status]);

  useEffect(() => {
    const initialSeats = () => {
      const alpha = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
      ];
      const theatre = { ...item };
      const platSeats = [];
      const glodSeats = [];
      const silverSeats = [];

      for (var i = 1; i <= +theatre.seats.silver / 10; i++) {
        for (var j = 1; j <= 10; j++) {
          silverSeats.push(`${alpha[i - 1]}${j}`);
        }
      }
      for (var i = 1; i <= +theatre.seats.platinum / 10; i++) {
        for (var j = 1; j <= 10; j++) {
          platSeats.push(`${alpha[i - 1]}${j}`);
        }
      }
      for (var i = 1; i <= +theatre.seats.gold / 10; i++) {
        for (var j = 1; j <= 10; j++) {
          glodSeats.push(`${alpha[i - 1]}${j}`);
        }
      }
      setSeats({ platinum: platSeats, gold: glodSeats, silver: silverSeats });
    };
    initialSeats();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (
    index: number,
    type: "silver" | "gold" | "platinum"
  ) => {
    const selected = { ...selectedSeats };

    const seat = seats ? seats[type][index] : null;
    if (!seat) {
      return;
    }

    const seatIndex = selected[type]?.indexOf(seat);

    if (seatIndex !== -1) {
      selected[type]?.splice(seatIndex!, 1);
    } else {
      if (!selected[type]) {
        selected[type] = [seat];
      } else {
        selected[type]?.push(seat);
      }
    }

    setSelectedSeats(selected as seatsInterface);
  };
  useEffect(() => {
    const price =
      selectedSeats.silver.length * 150 +
      selectedSeats.gold.length * 180 +
      selectedSeats.platinum.length * 200;
    setTotalPrice(price);
  }, [selectedSeats]);

  const handlePay = async () => {
    const newSeats: seatsInterface = { ...show?.booked_seats! };
    newSeats.silver = [...show?.booked_seats.silver!, ...selectedSeats.silver];
    newSeats.gold = [...show?.booked_seats.gold!, ...selectedSeats.gold];
    newSeats.platinum = [
      ...show?.booked_seats.platinum!,
      ...selectedSeats.platinum,
    ];
    const newShow = { ...show, booked_seats: newSeats };
    const newBooking: bookInterface = {
      show: show?._id!,
      movie,
      user: (user as userInterface | null)?._id!,
      date,
      time,
      seats: { ...selectedSeats },
    };
    const showResponse = await fetch("/api/updateShows", {
      method: "POST",
      headers: { "Contennt-Type": "application/json" },
      body: JSON.stringify({ show: newShow }),
    });
    const bookingResponse = await fetch("/api/updateBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: newBooking }),
    });
    if (showResponse.ok && bookingResponse.ok) {
      setPaymentModal(false);
      setSelectedSeats(emptySeats);
      setStatus("Seats are booked 🎉");
    } else {
      console.log("error");
      setPaymentModal(false);
      setSelectedSeats(emptySeats);
      setStatus("Sorry, Error while Booking");
    }
  };

  return (
    <div className="w-[98%] flex justify-between py-4 bg-gray-800 px-6 items-center rounded-md">
      <h1>{item.name}</h1>
      <div className="flex gap-2">
        {item.timings.map((time, index) => (
          <Button
            key={index}
            color="warning"
            variant="shadow"
            onPress={() => {
              setTime(time);
              setqunatityModal(true);
            }}
          >
            {time}
          </Button>
        ))}
      </div>
      <Modal
        isOpen={qunatityModal}
        onOpenChange={setqunatityModal}
        backdrop="blur"
        size="lg"
      >
        <ModalContent>
          <ModalHeader>Confirm</ModalHeader>
          <ModalBody>
            <h1>
              Theatre: <b>{item.name}</b> &nbsp;
              <small>
                {item.city},{item.state}
              </small>
            </h1>
            <h1>
              On {date} {time}
            </h1>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setqunatityModal(false)}
            >
              Close
            </Button>
            <Button
              color="primary"
              variant="shadow"
              onPress={() => {
                setSeatsModal(true);
                setqunatityModal(false);
              }}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={seatsModal}
        onOpenChange={setSeatsModal}
        backdrop="blur"
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>Select Seats</ModalHeader>
          <ModalBody>
            <div>
              <div className="relative">
                <div className="w-fit mx-auto">
                  <p className=" text-xs w-fit mx-auto text-gray-400">Screen</p>
                  <div className="screen"></div>
                </div>
                <h1 className="absolute right-20 text-slate-500 flex items-center">
                  Exit <ArrowRight size={15} />
                </h1>
                <div className="mt-10 w-3/4 mx-auto flex flex-col gap-3">
                  <div className="grid grid-cols-12 border border-gray-400 p-2 gap-1 rounded-md">
                    {seats?.silver.map((seat, index) => {
                      const isSelected = selectedSeats?.silver.includes(seat);
                      const isBooked = show?.booked_seats.silver.includes(seat);
                      let color: "success" | "default" | "danger" = "default";
                      let varient: "ghost" | "solid" = "ghost";
                      if (isBooked) {
                        color = "danger";
                        varient = "solid";
                      } else {
                        if (isSelected) {
                          color = "success";
                          varient = "solid";
                        } else {
                          color = "default";
                          varient = "ghost";
                        }
                      }
                      if (index % 10 === 2 || index % 10 === 8) {
                        return (
                          <>
                            <div className="h-4 w-2"></div>
                            <Button
                              isIconOnly
                              key={seat}
                              color={color}
                              variant={varient}
                              onPress={() => handleSelect(index, "silver")}
                              isDisabled={isBooked}
                              className={`h-4 text-xs  rounded-sm ${
                                (index % 10 === 1 || index % 10 === 7) && "mr-4"
                              }`}
                            >
                              {seat}
                            </Button>
                          </>
                        );
                      } else {
                        return (
                          <Button
                            isIconOnly
                            key={seat}
                            color={color}
                            variant={varient}
                            isDisabled={isBooked}
                            onPress={() => handleSelect(index, "silver")}
                            className={`h-4 text-xs  rounded-sm ${
                              (index % 10 === 1 || index % 10 === 7) && "mr-4"
                            }`}
                          >
                            {seat}
                          </Button>
                        );
                      }
                    })}
                  </div>
                  <div className="grid grid-cols-12 gap-1 border border-amber-400 p-2 rounded-md">
                    {seats?.gold.map((seat, index) => {
                      const isSelected = selectedSeats?.gold.includes(seat);
                      const isBooked = show?.booked_seats.gold.includes(seat);
                      let color: "success" | "warning" | "danger" = "warning";
                      let varient: "ghost" | "solid" = "ghost";
                      if (isBooked) {
                        color = "danger";
                        varient = "solid";
                      } else {
                        if (isSelected) {
                          color = "success";
                          varient = "solid";
                        } else {
                          color = "warning";
                          varient = "ghost";
                        }
                      }
                      if (index % 10 === 2 || index % 10 === 8) {
                        return (
                          <>
                            <div className="h-4 w-2"></div>
                            <Button
                              isIconOnly
                              key={seat}
                              color={color}
                              variant={varient}
                              isDisabled={isBooked}
                              onPress={() => handleSelect(index, "gold")}
                              className="h-4  text-xs rounded-sm"
                            >
                              {seat}
                            </Button>
                          </>
                        );
                      } else {
                        return (
                          <Button
                            isIconOnly
                            key={seat}
                            color={color}
                            variant={varient}
                            isDisabled={isBooked}
                            onPress={() => handleSelect(index, "gold")}
                            className="h-4  text-xs rounded-sm"
                          >
                            {seat}
                          </Button>
                        );
                      }
                    })}
                  </div>
                  <div className="grid grid-cols-12 gap-1 border border-l-neutral-400 p-2 rounded-md">
                    {seats?.platinum.map((seat, index) => {
                      const isSelected = selectedSeats?.platinum.includes(seat);
                      const isBooked =
                        show?.booked_seats.platinum.includes(seat);
                      let color: "success" | "primary" | "danger" = "primary";
                      let varient: "ghost" | "solid" = "ghost";
                      if (isBooked) {
                        color = "danger";
                        varient = "solid";
                      } else {
                        if (isSelected) {
                          color = "success";
                          varient = "solid";
                        } else {
                          color = "primary";
                          varient = "ghost";
                        }
                      }
                      if (index % 10 === 2 || index % 10 === 8) {
                        return (
                          <>
                            <div className="h-4 w-2"></div>
                            <Button
                              isIconOnly
                              key={seat}
                              color={color}
                              variant={varient}
                              isDisabled={isBooked}
                              onPress={() => handleSelect(index, "platinum")}
                              className="h-4 text-xs rounded-sm"
                            >
                              {seat}
                            </Button>
                          </>
                        );
                      } else {
                        return (
                          <Button
                            isIconOnly
                            key={seat}
                            color={color}
                            variant={varient}
                            isDisabled={isBooked}
                            onPress={() => handleSelect(index, "platinum")}
                            className="h-4 text-xs rounded-sm"
                          >
                            {seat}
                          </Button>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className=" flex gap-3 mt-3">
                  <Chip color="default">Silver</Chip>
                  <Chip color="warning">Gold</Chip>
                  <Chip color="primary">Platinum</Chip>
                  <Chip color="success">Selected</Chip>
                  <Chip color="danger">Booked</Chip>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="font-bold">Total</p>
                    <p>Rs. {totalPrice} </p>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <h1 className="justify-end font-bold">Selected Seats</h1>
                    <div className="flex justify-end">
                      {selectedSeats.silver.length ? (
                        selectedSeats.silver.map((seat, index) => {
                          return (
                            <Chip
                              color="default"
                              key={index}
                              variant="light"
                              size="sm"
                            >
                              {seat}
                            </Chip>
                          );
                        })
                      ) : (
                        <></>
                      )}
                      {selectedSeats.gold.length ? (
                        selectedSeats.gold.map((seat, index) => {
                          return (
                            <Chip
                              color="warning"
                              key={index}
                              variant="light"
                              size="sm"
                            >
                              {seat}
                            </Chip>
                          );
                        })
                      ) : (
                        <></>
                      )}
                      {selectedSeats.platinum.length ? (
                        selectedSeats.platinum.map((seat, index) => {
                          return (
                            <Chip
                              color="primary"
                              variant="light"
                              key={index}
                              size="sm"
                            >
                              {seat}
                            </Chip>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setSeatsModal(false)}
            >
              Close
            </Button>
            <Button
              variant="flat"
              onPress={() => {
                setqunatityModal(true);
                setSeatsModal(false);
              }}
            >
              Go Back
            </Button>
            <Button
              color="primary"
              variant="shadow"
              onPress={() => {
                setSeatsModal(false);
                setPaymentModal(true);
              }}
            >
              Proceed to Payement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={paymentModal}
        onOpenChange={setPaymentModal}
        size="md"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Pyement</ModalHeader>
          <ModalBody>Card</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setPaymentModal(false)}
            >
              Close
            </Button>
            <Button
              onPress={() => {
                setPaymentModal(false);
                setSeatsModal(true);
              }}
            >
              Go Back
            </Button>
            <Button
              color="primary"
              variant="shadow"
              onPress={() => handlePay()}
            >
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={status} onOpenChange={setStatus}>
        <ModalContent>
          <ModalHeader>Payment Status</ModalHeader>
          <ModalBody>{status}</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setStatus(null)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TheatreCard;
