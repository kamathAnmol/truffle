"use client";
// const apiKey = "bb393b7476beaebaea70ee092e45bb47";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// console.log(apiKey);
const baseUri = "https://api.themoviedb.org/3/";
export const img_base_uri = "https://image.tmdb.org/t/p/original";
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
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  first_air_date?: string; // For TV shows and TV seasons
  release_date?: string; // For movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // For TV shows and TV seasons
  video?: boolean; // For movies
}
export const getAllTrending = async () => {
  const response = await fetch(`${baseUri}/trending/all/day?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
};

export const search = async (type: string, value: string) => {
  const res = await fetch(
    `${baseUri}/search/${type}?api_key=${apiKey}&query=${value}`
  );
  const data = await res.json();
  return data.results;
};
