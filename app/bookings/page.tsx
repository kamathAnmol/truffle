"use client";

import { selectCurrentUser } from "@/store/root-reducer";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookingInterface } from "../api/updateBookings/route";
import { fetchDetails } from "../api/fetchData";
import BookingsCard from "../components/bookingsCard/bookingsCard";

type Props = {};

const BookingPage = (props: Props) => {
  const uid = useSelector(selectCurrentUser);
  const [upComing, setUpcoming] = useState<bookingInterface[]>();
  const [old, setOld] = useState<bookingInterface[]>();

  useEffect(() => {
    const oldBooking = (date: string, time: string): boolean => {
      const [day, month, year] = date.split("/").map(Number);
      const [givenHour, givenMinute] = time.split(":").map(Number);
      const givenTime = new Date(year, month - 1, day, givenHour, givenMinute);
      const currentTime = new Date();
      return givenTime < currentTime;
    };

    const getBookings = async () => {
      const response = await fetch("/api/getBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uid),
      });
      if (response.ok) {
        const data = await response.json();
        const bookings: bookingInterface[] = data.bookings;
        const oldBookings: bookingInterface[] = [];
        const upcomingBookings: bookingInterface[] = [];
        bookings.map((booking) => {
          if (oldBooking(booking.time.show_date, booking.time.show_time)) {
            oldBookings.push(booking);
          } else {
            upcomingBookings.push(booking);
          }
        });
        setOld(
          oldBookings.sort((a, b) => {
            const dateA = new Date(a.time.show_date + " " + a.time.show_time);
            const dateB = new Date(b.time.show_date + " " + b.time.show_time);
            return dateA.getTime() - dateB.getTime();
          })
        );
        setUpcoming(
          upcomingBookings.sort((a, b) => {
            const dateA = new Date(a.time.show_date + " " + a.time.show_time);
            const dateB = new Date(b.time.show_date + " " + b.time.show_time);
            return dateA.getTime() - dateB.getTime();
          })
        );
      } else {
        console.log("error wgile fetching bookings", response);
      }
    };
    getBookings();
  }, [uid]);
  // console.log(old, upComing);
  return (
    <div className="w-full md:w-4/5 mx-auto my-4 relative">
      <Tabs aria-label="Bookings">
        <Tab key="upcoming" title={`Upcoming Bookings(${upComing?.length})`}>
          {upComing?.length! > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upComing?.map((item) => (
                <BookingsCard item={item} key={item.seats}></BookingsCard>
              ))}
            </div>
          ) : (
            <h1 className="text-center font-extrabold text-4xl">
              No Upcomings Bookings
            </h1>
          )}
        </Tab>
        <Tab key="old" title={`Old Bookings(${old?.length})`}>
          {old?.length! > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {old?.map((item) => (
                <BookingsCard item={item} key={item.seats}></BookingsCard>
              ))}
            </div>
          ) : (
            <h1 className="text-center font-extrabold text-4xl">
              No Old Bookings
            </h1>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default BookingPage;
