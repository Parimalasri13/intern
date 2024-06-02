import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosprivate";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Home/GenreMovies.css";
import MovieCard from "../../components/MovieCard";

const API_KEY = process.env.REACT_APP_API_KEY;

const ReadFolder = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        // Make a request to the backend to fetch user's favorite movies
        const response = await axiosPrivate.get("/favorites");
        const favoriteMovieIds = response.data; // Assuming backend returns movie IDs
        const moviesData = await Promise.all(
          favoriteMovieIds.map(async (movieId) => {
            const movieResponse = await axios.get(
              `http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
            );
            return movieResponse.data;
          })
        );

        // Set the fetched movie details to state
        setFavoriteMovies(moviesData);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    fetchFavoriteMovies();
  }, [axiosPrivate]);

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
      <h3 style={{ marginLeft: "20px" }}>Favorite movies</h3>
      {favoriteMovies.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay>
          {favoriteMovies.map((movie) => (
            <MovieCard movie={movie} from="favs" />
          ))}
        </Carousel>
      ) : (
        <p style={{ color: "white", marginLeft: "20px" }}>
          No favorites movies :( , Explore home page to add them!!
        </p>
      )}
    </div>
  );
};

export default ReadFolder;
