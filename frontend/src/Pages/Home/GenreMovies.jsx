import React, { useState, useEffect } from "react";
import Axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./GenreMovies.css";
import MovieCard from "../../components/MovieCard";
import useAxiosPrivate from "../../hooks/useAxiosprivate";
import useAuth from "../../hooks/useAuth";

const API_KEY = process.env.REACT_APP_API_KEY;

const GenreMovies = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const checkFav = async () => {
      try {
        const response = await axiosPrivate.get("/favorites");
        setFavs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.name) {
      checkFav();
    }
  }, [auth?.name, axiosPrivate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await Axios.get(
          `https://www.omdbapi.com/?s=${genre}&apikey=${API_KEY}`
        );
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="genre-movies">
      <h3 style={{ marginLeft: "20px" }}>{genre}</h3>
      {loading ? (
        <p style={{ marginLeft: "20px" }}>Loading...</p>
      ) : (
        <Carousel responsive={responsive} infinite autoPlay>
          {movies.map((movie) => (
            <MovieCard movie={movie} favs={favs} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default GenreMovies;
