"use client";
interface citiesInterface {
  city: string;
  state: string;
}
export interface dateInterface {
  date: string;
  seats_booked: number;
}
export interface Timings {
  time: string;
  date: dateInterface[];
}

export interface moviesInterface {
  movie: number;
  time: Timings[];
}
export interface theatreInterface {
  _id: string;
  state: string;
  city: string;
  name: string;
  timings: string[];
  movies: moviesInterface[];
  total_seats: number;
}

import React, { useEffect, useState } from "react";

import {
  Button,
  Image,
  Progress,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  CalendarIcon,
  Calendar as CalenderIcon,
  MapPin,
  X,
} from "lucide-react";
import { detailsType, fetchDetails, img_base_uri } from "@/app/api/fetchData";
import { clInterface } from "@/store/root-reducer";
import TheatreCard from "@/app/components/theatre Card/theatreCard";

const BookPage = ({ params }: { params: { id: string } }) => {
  const [cities, setcities] = useState<citiesInterface[] | null>([]);
  const [theatres, setTheatres] = useState<theatreInterface[]>([]);
  const [details, setDetails] = useState<detailsType>();
  const [img, setImg] = useState<string>("");
  const id = params.id;

  type dateValueInterface = Date | null;
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [modalValue, setModalValue] = useState<Value>(new Date());

  const [selected, setSelected] = useState<string>("Bengaluru,Karnataka");
  const [cityState, setCityState] = useState<citiesInterface>({
    city: "Bengaluru",
    state: "Karnataka",
  });
  const [dateValue, dateOnChange] = useState<dateValueInterface>(new Date());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const getLoc = async () => {
      if (selected === "location") {
        const result = await fetch("https://ipapi.co/json/");
        const location: clInterface = await result.json();
        const { city, region } = location;
        await setCityState({ city, state: region });
        console.log(cityState);
      }
    };
    getLoc();
    const getTheatres = async () => {
      try {
        const dateRequest = `${dateValue!.getDate()}/${
          dateValue!.getMonth() + 1
        }/${dateValue!.getFullYear()}`;
        const { city, state } = cityState!;
        const response = await fetch("/api/gettheatres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city, state, dateRequest, id }),
        });
        if (response.ok) {
          const { data } = await response.json();
          setTheatres(data.theatres);
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getTheatres();
  }, [selected, dateValue, cityState, id]);
  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await fetch("/api/getcities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const { data } = await response.json();
          const addedList: string[] = [];
          const cityList: citiesInterface[] = [];
          data.cities.map((cityObject: citiesInterface) => {
            const { city } = cityObject;
            if (addedList.includes(city)) return;
            else {
              addedList.push(city);
              cityList.push(cityObject);
            }
          });
          setcities(Array.from(cityList));
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    const getDetails = async () => {
      const response = await fetchDetails("movie", id);
      setDetails(response);
    };

    getCities();
    getDetails();
  }, [id]);
  useEffect(() => {
    setImg(details?.poster_path!);
    console.log(details?.poster_path);
  }, [details?.poster_path]);
  return (
    <div>
      <div className="w-full p-4 flex justify-center gap-4 items-center fixed top-16 bg-black/60 backdrop-blur-lg border-y-gray z-50">
        <Button
          variant="bordered"
          color="warning"
          onPress={() => setSelected("location")}
        >
          <MapPin size={20} /> Use Current Location
        </Button>
        <Select
          label="Select your City"
          className="w-11/12 md:w-2/5"
          size="sm"
          variant="bordered"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            const spilted = e.target.value.split(",");
            setCityState({ city: spilted[0], state: spilted[1] });
          }}
          showScrollIndicators
        >
          {cities!.map(({ city, state }: citiesInterface) => {
            return (
              <SelectItem
                value={`${city},${state}`}
                key={`${city},${state}`}
                startContent={
                  <MapPin strokeWidth={0.5} color="#969696" size={20} />
                }
              >
                {`${city}, ${state}`}
              </SelectItem>
            );
          })}
        </Select>
        {selected !== null && (
          <div className="absolute right-4 flex gap-2 items-end">
            <div>
              <h1 className="font-bold text-lg text-right  ">
                {cityState?.city}
              </h1>
              <p className=" text-right text-gray-500">{cityState?.state}</p>
            </div>
            <MapPin size={50} strokeWidth={1} color="#003eb3"></MapPin>
          </div>
        )}
        <div className=" fixed left-0  md:ml-8 mx-2 rounded-md top-[200%]  flex-col items-center hidden md:flex">
          <div className="w-fit m-4 md:m-8 flex flex-col">
            <Image
              src={`${img_base_uri}${img}`}
              alt=""
              className="rounded-md w-fit max-h-60 md:max-h-80 xl:max-h-96 m-0"
            ></Image>
            <h1 className="w-3/4">{details?.title}</h1>
            <div className="progress-wrapper w-2/3">
              <Progress
                size="sm"
                aria-label="Loading..."
                value={details?.vote_average! * 10}
                showValueLabel={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-40 ">
        <div className=" flex justify-between m-4 items-center  ml-96 mr-4">
          {dateValue !== null && (
            <h1 className="text-lg font-bold">{`${dateValue.getDate()}/${
              dateValue.getMonth() + 1
            }/${dateValue.getFullYear()}`}</h1>
          )}
          <div className="flex gap-3 items-center">
            <h1>Select Date:</h1>
            <Button
              onPress={() => dateOnChange(new Date())}
              variant="bordered"
              color="primary"
              size="md"
            >
              Today
            </Button>
            <Button
              variant="bordered"
              color="primary"
              size="md"
              onPress={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateOnChange(tomorrow);
              }}
            >
              Tomorrow
            </Button>
            <Button color="primary" onPress={onOpen}>
              Select Date <CalendarIcon />
            </Button>
          </div>
        </div>
        {theatres.length > 0 ? (
          <div className="ml-96 mr-4 grid gap-4">
            {theatres.map((item) => (
              <TheatreCard
                item={item}
                date={`${dateValue!.getDate()}/${
                  dateValue!.getMonth() + 1
                }/${dateValue!.getFullYear()}`}
                key={item._id}
              />
            ))}
          </div>
        ) : (
          <h1 className=" font-bold text-4xl text-center my-96">
            No Theaters in Your City
          </h1>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Date
              </ModalHeader>
              <ModalBody>
                <p>
                  Selected Date: {modalValue?.toLocaleString().split(",")[0]}
                </p>
                <Calendar value={modalValue} onChange={setModalValue} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    dateOnChange(modalValue as dateValueInterface);
                    onClose();
                  }}
                >
                  Select Date
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookPage;
