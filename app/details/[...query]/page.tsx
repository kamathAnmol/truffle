"use client";

import {
  Person,
  WatchProvider,
  WatchProvidersInterface,
  detailsType,
  fetchCredits,
  fetchDetails,
  fetchSimilar,
  getWatchProviders,
  img_base_uri,
} from "@/app/api/fetchData";
import { loactionSelector, selectCurrentUser } from "@/store/root-reducer";
import {
  Button,
  Chip,
  Image,
  Progress,
  Spinner,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeartBtn from "@/app/components/heartBtn/heartBtn";
import Display3 from "@/app/components/display/display3";
import Display4 from "@/app/components/display/display4";
import VideoGallary from "@/app/components/videoGallary/videoGallary";
import Display1 from "@/app/components/display/display1";
import ImgGallary from "@/app/components/imgGallary/imgGallary";

const DetailPage = ({ params }: { params: { query: string[] } }) => {
  const query = params.query;
  const [details, setDetails] = useState<detailsType>();
  const [crew, setCrew] = useState<Person[]>();
  const [cast, setCast] = useState<Person[]>();

  const [isLoading, setLoading] = useState<Boolean>(true);
  const [providers, setProviders] = useState<WatchProvider[]>();
  const [similar, setSimilar] = useState<detailsType[]>();
  const countryCode = useSelector(loactionSelector);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const uid = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchData = async () => {
      const data: detailsType = await fetchDetails(query[0], query[1]);
      setDetails(data);
      const getCredits = await fetchCredits(query[0], query[1]);
      setCast(getCredits.cast);
      setCrew(getCredits.crew);
      const watchData: WatchProvidersInterface = await getWatchProviders(
        query[0],
        +query[1]
      );
      if (watchData.results !== undefined)
        if (watchData.results[countryCode] !== undefined) {
          const countrydata = watchData.results[countryCode];
          const tempProvider = new Set<WatchProvider>();
          countrydata.ads?.map((item) => tempProvider.add(item));
          countrydata.buy?.map((item) => tempProvider.add(item));
          countrydata.flatrate?.map((item) => tempProvider.add(item));
          countrydata.rent?.map((item) => tempProvider.add(item));
          setProviders(Array.from(tempProvider));
        }
      const getSimilar = await fetchSimilar(query[0], query[1]);
      setSimilar(getSimilar);
    };

    fetchData();
    setLoading(false);
  }, [query, countryCode]);
  const trailer = details?.videos?.results?.filter(
    (item) => item.type === "Trailer" && item.site === "YouTube"
  )[0];
  const imgList: string[] = [];
  details?.images.backdrops.map((img) =>
    imgList.push(`${img_base_uri}${img.file_path}`)
  );
  details?.images.posters.map((img) =>
    imgList.push(`${img_base_uri}${img.file_path}`)
  );
  details?.images.logos.map((img) =>
    imgList.push(`${img_base_uri}${img.file_path}`)
  );
  let imgPath =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  if (details?.media_type === "movie" || details?.media_type === "tv") {
    imgPath = `${img_base_uri}${details.poster_path}`;
  } else {
    imgPath = `${img_base_uri}${details?.profile_path}`;
  }

  if (!isLoading) {
    return (
      <div>
        <div
          className="top-container w-full md:w-4/5 mx-auto "
          style={{
            background: details?.backdrop_path
              ? `url(${img_base_uri}${details?.backdrop_path}) no-repeat`
              : "#363636",
            minHeight: "30vw",
          }}
        >
          <div
            className="backdrop-wrapper flex flex-col md:flex-row content-start md:content-center w-full  bg-black/70 backdrop-blur-sm p-20"
            style={{ minHeight: "30vw" }}
          >
            {uid !== null && (
              <div className="absolute top-3 right-3 w-14">
                <HeartBtn id={query[1]} type={query[0]} />
              </div>
            )}

            <div className="img-wrapper w-1/3 flex content-center md:m-auto">
              <Image
                src={imgPath!}
                alt=""
                className="w-2/3 rounded-md m-auto "
              />
            </div>
            <div className="content-wrapper w-3/4 my-14  md:my-auto h-4/5 flex flex-col gap-4 mx-10">
              <h1 className=" font-bold text-lg xl:text-3xl">
                {details?.name || details?.title} &nbsp;
                {(details?.original_name || details?.original_title) && (
                  <span className=" font-thin text-lg">
                    ({details?.original_name || details?.original_title})
                  </span>
                )}
              </h1>
              {(details?.first_air_date || details?.release_date) && (
                <span className="flex w-2/4 gap-2">
                  <p>{details?.first_air_date || details?.release_date}</p>
                  &#46;
                  {details.number_of_episodes && (
                    <p>
                      {details.number_of_seasons}
                      {details.number_of_seasons! > 1 ? (
                        <> seasons</>
                      ) : (
                        <> season</>
                      )}
                    </p>
                  )}
                  {details.runtime && (
                    <p>{(details.runtime / 60).toFixed(1)}h </p>
                  )}
                </span>
              )}
              {details?.vote_average && (
                <>
                  <div className="progress-wrapper w-2/3">
                    <Progress
                      size="sm"
                      aria-label="Loading..."
                      value={details?.vote_average * 10}
                      showValueLabel={true}
                    />
                  </div>
                  <p>{details.vote_count} users have Voted this </p>
                </>
              )}
              <div className="flex">
                {details?.genres?.map((genre) => {
                  return <Chip key={genre.id}>{genre.name}</Chip>;
                })}
              </div>

              {details?.tagline && (
                <p className=" opacity-75">{details?.tagline}</p>
              )}
              {providers?.length! > 0 && (
                <div>
                  <h1 className=" font-bold text-lg mb-4">Available in:</h1>
                  <div className="flex gap-4">
                    {providers?.map((provider) => {
                      return (
                        <Tooltip
                          content={provider.provider_name}
                          key={provider.provider_id}
                        >
                          <Image
                            src={`${img_base_uri}${provider.logo_path}`}
                            alt=""
                            key={provider.provider_id}
                            className=" rounded-full h-8 w-8"
                          ></Image>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              )}
              {trailer !== null && trailer !== undefined && (
                <>
                  <Tooltip content="watch Trailer">
                    <Button
                      variant="bordered"
                      color="danger"
                      onPress={onOpen}
                      className="w-fit"
                    >
                      Trailer
                    </Button>
                  </Tooltip>
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="5xl"
                    backdrop="blur"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Trailer
                          </ModalHeader>
                          <ModalBody>
                            <iframe
                              height={600}
                              src={`https://www.youtube.com/embed/${trailer?.key}`}
                              className=" rounded-md p-8"
                              allowFullScreen
                            ></iframe>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </>
              )}
              {details?.overview && <p>{details.overview}</p>}
            </div>
          </div>
        </div>
        <div className="w-4/5 mx-auto my-8">
          <Tabs size="lg" disableAnimation>
            <Tab key="Cast" title="Cast">
              <div className=" bg-stone-900 rounded-md p-8  my-8">
                <h1 className="font-bold text-2xl">Cast</h1>
                <Display3 list={cast} key={query[1]}></Display3>
              </div>
            </Tab>
            <Tab key="Crew" title="Crew">
              <div className=" bg-stone-900 rounded-md p-8  my-8">
                <h1 className="font-bold text-2xl">Crew</h1>
                <Display3 list={crew} key={query[1]}></Display3>
              </div>
            </Tab>
            <Tab title="Similar" key={"similar"}>
              <div className=" bg-stone-900 rounded-md p-8  my-8">
                <h1 className="font-bold text-2xl">Similar</h1>
                <Display1 list={similar!} key={query[1]}></Display1>
              </div>
            </Tab>
            {details?.media_type === "tv" && (
              <Tab title="Seasons" key={"Seasons"}>
                <div className=" bg-stone-900 rounded-md p-8 my-8">
                  <h1 className="font-bold text-2xl">Seasons</h1>
                  <Display4
                    seasons={details.seasons}
                    id={details.id}
                  ></Display4>
                </div>
              </Tab>
            )}
            <Tab title={`Images(${imgList.length})`} key="Images">
              <div className=" bg-stone-900 rounded-md p-8 my-8">
                <h1 className="font-bold text-2xl">Images</h1>

                <ImgGallary imgs={imgList}></ImgGallary>
              </div>
            </Tab>
            <Tab
              title={`Videos(${details?.videos?.results?.length})`}
              key="Videos"
            >
              <div className=" bg-stone-900 rounded-md p-8 my-8">
                <h1 className="font-bold text-2xl">Videos</h1>
                <VideoGallary videos={details?.videos?.results}></VideoGallary>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  } else {
    return <Spinner></Spinner>;
  }
};

export default DetailPage;
