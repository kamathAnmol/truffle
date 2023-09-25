"use client";

import { useDispatch } from "react-redux";

// const apiKey = "bb393b7476beaebaea70ee092e45bb47";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// console.log(apiKey);
const baseUri = "https://api.themoviedb.org/3/";
export const img_base_uri = "https://image.tmdb.org/t/p/original";
export const youtubeBaseUri = "https://www.youtube.com/watch?v=";
export interface MediaItem {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows and TV seasons
  original_language: string;
  original_title?: string; // For movies
  original_name?: string; // For TV shows and TV seasons
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  genre_ids: number[];
  popularity: number;
  first_air_date?: string; // For TV shows and TV seasons
  release_date?: string; // For movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // For TV shows and TV seasons
  video?: boolean; // For movies
  gender?: number; // For person
  known_for_department?: string; // For person
  profile_path?: string | null; // For person
  known_for?: KnownFor[];
}
export interface genreInterface {
  id: number;
  name: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority: number;
}

export interface WatchProvidersInterface {
  id: number; // The movie or TV show ID
  results: {
    [countryCode: string]: {
      link: string | null;
      buy: WatchProvider[] | null;
      rent: WatchProvider[] | null;
      flatrate: WatchProvider[] | null;
      ads: WatchProvider[] | null;
    };
  };
}

export interface countryInterface {
  link: string | null;
  buy: WatchProvider[] | null;
  rent: WatchProvider[] | null;
  flatrate: WatchProvider[] | null;
  ads: WatchProvider[] | null;
}
interface KnownFor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows and TV seasons
  original_language: string;
  original_title?: string; // For movies
  original_name?: string; // For TV shows and TV seasons
  overview: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  genre_ids: number[];
  popularity: number;
  first_air_date?: string; // For TV shows and TV seasons
  release_date?: string; // For movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // For TV shows and TV seasons
  video?: boolean;
}

export interface detailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget?: number;
  genres?: genreInterface[];
  homepage: string;
  media_type?: string;
  genre_ids?: number[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies?: any[];
  production_countries?: any[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: any[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  videos?: {
    results?: videosInterface[];
  };
  images: {
    backdrops: imgInterface[];
    posters: imgInterface[];
    loops: imgInterface[];
    logos: imgInterface[];
  };
  created_by?: any[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
  } | null;
  name?: string;
  networks?: any[];
  next_episode_to_air?: any | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: Season[];
  type?: string;

  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  gender?: number;
  known_for_department?: string;
  place_of_birth?: string;
  profile_path?: string | null;
}

export interface videosInterface {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  cast_id?: number;
  character?: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface creditsInterface {
  cast: Person[];
  crew: Person[];
  id: number;
}
export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
export interface Episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Person[];
  guest_stars: Person[];
}

export interface seasonDetails {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
export interface imgInterface {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export const getAllTrending = async () => {
  const response = await fetch(`${baseUri}/trending/all/day?api_key=${apiKey}`);
  const data = await response.json();

  return data.results;
};

export const search = async (
  type: string,
  value: string
): Promise<MediaItem[]> => {
  const res = await fetch(
    `${baseUri}/search/${type}?api_key=${apiKey}&query=${value}`
  );
  const data = await res.json();
  return data.results;
};

export const fetchDetails = async (
  type: string,
  id: string
): Promise<detailsType> => {
  const response = await fetch(
    `${baseUri}${type}/${id}?api_key=${apiKey}&append_to_response=videos,images`
  );
  const data: detailsType = await response.json();
  4;
  data.media_type = type;
  data.genre_ids = data.genres?.map((genre) => genre.id);
  return data;
};

export const fetchGenres = async () => {
  let response = await fetch(`${baseUri}/genre/movie/list?api_key=${apiKey}`);
  const movieGenres = await response.json();
  response = await fetch(`${baseUri}/genre/tv/list?api_key=${apiKey}`);
  const tvGenres = await response.json();
  const genres: { movie: genreInterface[]; tv: genreInterface[] } = {
    movie: movieGenres.genres,
    tv: tvGenres.genres,
  };
  return genres;
};

export const fetchLatest = async (type: string): Promise<detailsType[]> => {
  const response = await fetch(
    `${baseUri}trending/${type}/week?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchByGenre = async (type: string, genreId: string) => {
  const response = await fetch(
    `${baseUri}discover/${type}?api_key=${apiKey}&with_genres=${genreId}`
  );
  const results = await response.json();
  const data = results.results;

  return data;
};

export const fetchCredits = async (type: string, id: string) => {
  const response = await fetch(
    `${baseUri}${type}/${id}/credits?api_key=${apiKey}`
  );
  const data: creditsInterface = await response.json();
  return data;
};

export const fetchSeasonDetails = async (id: number, seasonNumber: number) => {
  const response = await fetch(
    `${baseUri}tv/${id}/season/${seasonNumber}?api_key=${apiKey}`
  );
  const data: seasonDetails = await response.json();
  return data;
};

export const getLanguages = async () => {
  const languagesRes = await fetch(
    `${baseUri}configuration/languages?api_key=${apiKey}`
  );
  const languages = await languagesRes.json();
  return languages;
};

export const getByLanguages = async (
  type: string,
  langId: string
): Promise<detailsType[]> => {
  const uri = `${baseUri}/discover/${type}?with_original_language=${langId}&api_key=${apiKey}&sort_by=popularity.desc`;
  const response = await fetch(uri);
  const result = await response.json();
  const data: detailsType[] = result.results;
  data.map((item) => (item.media_type = type));
  return data;
};

export const getWatchProviders = async (
  type: string,
  id: number | undefined
): Promise<WatchProvidersInterface> => {
  const response = await fetch(
    `${baseUri}${type}/${id!}/watch/providers?api_key=${apiKey}`
  );
  const results = await response.json();
  return results;
};
