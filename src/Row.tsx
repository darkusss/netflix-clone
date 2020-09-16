import React, { useState, useEffect } from "react";
import Youtube, { Options } from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }: any) => {
  const [movies, setMovies] = useState<any>([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = (movie: any): void => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v") || "");
        })
        .catch((error: string) => console.log(error));
    }
  };

  const opts: Options = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie: any) => {
          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && " row__posterLarge"}`}
              src={
                baseURL + (isLargeRow ? movie.poster_path : movie.backdrop_path)
              }
              alt={movie.name}
              onClick={(): void => handleClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
