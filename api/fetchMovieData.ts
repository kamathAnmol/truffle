const apiKey = "bb393b7476beaebaea70ee092e45bb47";
// const apiKey = process.env.TMDB_API_KEY;
const baseUri = "https://api.themoviedb.org/3/";

export interface MediaItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: "tv" | "movie";
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  video: boolean;
}

export const getAllTrending = async () => {
  const response = await fetch(`${baseUri}/trending/all/day?api_key=${apiKey}`);
  const data = await response.json();
  console.log(data);
  return data.results;
};

export const getAllBackDrops = (data: MediaItem[]) => {
  const backDrops = data.map(
    (media) => `https://image.tmdb.org/t/p/original${media.backdrop_path}`
  );
  return backDrops;
};
