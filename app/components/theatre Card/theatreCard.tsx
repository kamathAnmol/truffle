import { theatreInterface } from "@/app/book/[id]/page";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
} from "@nextui-org/react";
import React, { useState } from "react";
import "./theatreCardStyles.scss";
import { Minus, Plus, X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/root-reducer";
import { bookingInterface } from "@/app/api/updateBookings/route";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";

type Props = {
  item: theatreInterface;
  date: string;
};

const TheatreCard = ({ item, date }: Props) => {
  // eslint-disable-next-line no-console
  const uid = useSelector(selectCurrentUser)!._id;

  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
  const [seats, setSeats] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>();
  const [error, setError] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [statusModal, setStatusModal] = useState<string>("");
  const getPercentage = (x: number) => (x / item.total_seats) * 100;
  const [paymentMOdal, setPaymentModal] = useState<boolean>(false);
  const checkTime = (time: string, date: string) => {
    const [day, month, year] = date?.split("/").map(Number);
    const [givenHour, givenMinute] = time?.split(":").map(Number);

    const givenTime = new Date(year, month - 1, day, givenHour, givenMinute);
    const currentTime = new Date();
    return givenTime < currentTime;
  };
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uid === null) {
      setStatusModal("Please login to Book");
      setShowSuccessModal(true);
      return;
    }
    if (!stripe || !elements) return;
    const reqBody: bookingInterface = {
      uid,
      movie_id: item.movies[0].movie,
      theatre_id: item._id,
      seats: seats,
      time: {
        show_date: date,
        show_time: item.movies[0].time[selectedTime!].time,
      },
    };

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount: seats * 180,
        }),
      });
      const data: PaymentIntent = await response.json();
      const { client_secret } = data;
      const paymentResult = await stripe.confirmCardPayment(client_secret!, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: uid.toString() ?? "guest",
          },
        },
      });
      if (paymentResult.error) {
        console.error(paymentResult.error);
        setStatusModal("Error durring Payment");
        setPaymentModal(false);
        setShowSuccessModal(true);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          const bookingsResponse = await fetch("/api/updateBookings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          });
          if (bookingsResponse.ok) {
            console.log("Updated Db");
            setStatusModal("Booked Successfully 🎉");
            setPaymentModal(false);
            setShowSuccessModal(true);
            onClose();
          } else {
            setError(error);
            console.log("error while updating db", bookingsResponse);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-zinc-900 w-full p-4 rounded-md flex justify-between  items-center">
      <h1>{item.name}</h1>
      <div className="flex gap-3">
        {item.movies[0].time.map((timing, index) => {
          let color: "default" | "success" | "warning" | "danger" = "default";
          const percentage = getPercentage(+timing.date[0].seats_booked);
          if (percentage === 100) color = "default";
          else if (percentage > 75) color = "danger";
          else if (percentage > 50) color = "warning";
          else color = "success";
          return (
            <Button
              variant="flat"
              color={color}
              key={timing.time}
              onPress={() => {
                setSelectedTime(index);
                onOpen();
              }}
              isDisabled={checkTime(timing.time, date)}
            >
              {timing.time}
            </Button>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xs"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Number of Seats🍿
              </ModalHeader>
              <ModalBody>
                <h1>Theatre : {item.name}</h1>
                <h1>Time : {item.movies[0].time[selectedTime!].time}</h1>
                <h1>Seats : {seats} </h1>
                <input
                  type="range"
                  max={10}
                  min={0}
                  value={seats}
                  onChange={(e) => setSeats(+e.target.value)}
                  className="block xl:hidden"
                />
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    onPress={() => setSeats(seats - 1)}
                    isDisabled={seats === 0}
                  >
                    <Minus />
                  </Button>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Enter number of seats"
                    value={seats.toString()}
                    onChange={(e) => setSeats(+e.target.value)}
                    isInvalid={seats > 10 || seats < 0}
                    className="hidden xl:block w-40"
                  />
                  <Button
                    isIconOnly
                    onPress={() => setSeats(seats + 1)}
                    isDisabled={seats === 10}
                  >
                    <Plus />
                  </Button>
                </div>
                {error !== null && (
                  <Chip startContent={<X />} variant="bordered" color="danger">
                    Error while Booking
                  </Chip>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => setPaymentModal(true)}>
                  Book
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={paymentMOdal}
        onOpenChange={() => setPaymentModal(false)}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClosePayment) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add card Details :
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className=" bg-gray-300 py-4 px-2 rounded-md">
                    <CardElement />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={() => {
                      setPaymentModal(false);
                    }}
                    type="button"
                  >
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Book
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showSuccessModal}
        onOpenChange={() => setShowSuccessModal(false)}
        size="xs"
        backdrop="blur"
      >
        <ModalContent>
          {(onCloseSuccess) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Booking Status:
              </ModalHeader>
              <ModalBody>
                <p>{statusModal}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => setShowSuccessModal(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TheatreCard;
