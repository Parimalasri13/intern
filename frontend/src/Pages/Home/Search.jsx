import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./GenreMovies.css";
import MovieCard from "../../components/MovieCard";
import useAxiosPrivate from "../../hooks/useAxiosprivate";
import useAuth from "../../hooks/useAuth";

const API_KEY = process.env.REACT_APP_API_KEY;

const Search = ({ query }) => {
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
      setLoading(true);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
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
  }, [query]);

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
      <h3 style={{ marginLeft: "20px" }}>Results for {query}</h3>
      {loading ? (
        <p style={{ color: "white", marginLeft: "20px" }}>Loading...</p>
      ) : movies.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay>
          {movies.map((movie) => (
            <MovieCard movie={movie} favs={favs} />
          ))}
        </Carousel>
      ) : (
        <p style={{ color: "white", marginLeft: "20px" }}>
          No movies to show :(
        </p>
      )}
    </div>
  );
};

export default Search;
