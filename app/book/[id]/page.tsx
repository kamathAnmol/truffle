"use client";
import { detailsType, fetchDetails, img_base_uri } from "@/app/api/fetchData";
import TheatreCard from "@/app/components/theatre Card/theatreCard";
import { clInterface } from "@/store/root-reducer";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { MapPin } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
interface cityInterface {
  city: string;
  state: string;
}

export interface thetreInterface {
  _id: string;
  name: string;
  city: string;
  state: string;
  timings: string[];
  seats: { platinum: number; gold: number; silver: number };
}

const Book = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [city, setCity] = useState<cityInterface>();
  const [cities, setCities] = useState<cityInterface[]>([]);
  const [useCurrent, setUseCurrent] = useState<boolean>(true);
  const [movieDetails, setMovieDetials] = useState<detailsType>();
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [theatres, setTheatres] = useState<thetreInterface[]>([]);
  const currentDate = new Date();
  const [date, setdate] = useState<string>(
    `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`
  );
  const [calenderDate, setCalenderDate] = useState<Date | null>(new Date());
  const getLocation = useCallback(async () => {
    const response = await fetch("https://ipapi.co/json/");
    return await response.json();
  }, []);
  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch("/api/getcities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const { data } = await response.json();
      const cityData: cityInterface[] = data.cities;
      const cityNames: string[] = [];
      const cities: cityInterface[] = [];
      cityData.map((city) => {
        if (cityNames.includes(city.city)) return;
        else {
          cityNames.push(city.city);
          cities.push(city);
        }
      });
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);
  useEffect(() => {
    const getCity = async () => {
      if (useCurrent) {
        const location: clInterface = await getLocation();
        setCity({ city: location.city!, state: location.region! });
      } else {
        const { city, state } = cities[selectedCity];
        setCity({ city, state });
      }
    };
    getCity();
    // eslint-disable-next-line
  }, [selectedCity, useCurrent]);
  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchDetails("movie", id);
      setMovieDetials(details);
    };
    getMovieDetails();
  }, [id]);
  useEffect(() => {
    const getTheatres = async () => {
      try {
        const response = await fetch("/api/gettheatres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(city),
        });
        if (response.ok) {
          const data = await response.json();
          setTheatres(data.theatres);
        } else console.log("error while Fetching");
      } catch (error) {
        console.log("error while fetching", error);
      }
    };
    getTheatres();
  }, [city]);
  const changeDate = () => {
    setdate(
      `${calenderDate?.getDate()}/${
        calenderDate?.getMonth()! + 1
      }/${calenderDate?.getFullYear()}`
    );
    setShowCalender(false);
  };
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 10);
  return (
    <div>
      <div>
        <div className="w-2/3 mx-auto flex gap-4  items-center py-2 justify-center">
          <div className="flex">
            <Switch
              defaultSelected
              aria-label="Select Current Location"
              onChange={() => setUseCurrent(!useCurrent)}
              size="sm"
            />
            <p
              className={`text-xs ${
                useCurrent ? "" : "text-stone-600"
              } text-clip w-2/4`}
            >
              Use Current Location
            </p>
          </div>
          {cities.length > 0 && (
            <Select
              label="select your City"
              placeholder="Select City"
              isDisabled={useCurrent}
              size="sm"
              className="w-2/3"
              onChange={(e) => setSelectedCity(+e.target.value)}
              value={`${cities[selectedCity!].city},${
                cities[selectedCity!].state
              }`}
            >
              {cities.map((city, index) => {
                return (
                  <SelectItem
                    key={index}
                  >{`${city.city},${city.state}`}</SelectItem>
                );
              })}
            </Select>
          )}
          <div className="flex">
            <MapPin size={50} strokeWidth={0.8} color="#0030b4" />
            <div>
              <h1 className="font-bold text-lg">{city?.city}</h1>
              <p className="font-bold text-slate-300">{city?.state}</p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-11">
        <Card className=" col-span-2 mx-4">
          <CardHeader className="flex flex-col items-start">
            <p>
              {movieDetails?.title} <small>{movieDetails?.release_date}</small>
            </p>
            <p>{movieDetails?.original_language}</p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={`${img_base_uri}${movieDetails?.poster_path}`}
          ></Image>
        </Card>
        <div className="col-span-9">
          <div className="flex justify-between w-full items-center my-2">
            <h1>
              Selected Date : <b>{date}</b>
            </h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                color="primary"
                onPress={() => {
                  setdate(
                    `${currentDate.getDate()}/${
                      currentDate.getMonth() + 1
                    }/${currentDate.getFullYear()}`
                  );
                }}
              >
                Today
              </Button>
              <Button
                variant="ghost"
                color="primary"
                onPress={() => {
                  setdate(
                    `${currentDate.getDate() + 1}/${
                      currentDate.getMonth() + 1
                    }/${currentDate.getFullYear()}`
                  );
                }}
              >
                Tomorrow
              </Button>
              <Button
                variant="shadow"
                color="primary"
                onPress={() => setShowCalender(true)}
              >
                Select Date
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {theatres.map((theatre) => (
              <TheatreCard
                key={theatre._id}
                item={theatre}
                date={date}
                movie={id}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={showCalender}
        onOpenChange={() => setShowCalender(false)}
        backdrop="blur"
        size="sm"
      >
        <ModalContent>
          <ModalHeader>Select Date</ModalHeader>
          <ModalBody>
            Selected Date : {calenderDate?.toDateString()}
            <Calendar
              onChange={(v, e) => setCalenderDate(v as Date)}
              value={calenderDate}
              maxDate={maxDate}
              minDate={currentDate}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setShowCalender(false)}
            >
              Close
            </Button>
            <Button color="primary" variant="shadow" onPress={changeDate}>
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Book;
