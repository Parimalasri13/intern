import React, { useEffect, useState } from "react";
import "../Pages/Home/GenreMovies.css";
import useAxiosPrivate from "../hooks/useAxiosprivate";
import useAuth from "../hooks/useAuth";
import { showToast } from "./Toast";

const MovieCard = ({ movie, favs, from }) => {
  const axiosPrivate = useAxiosPrivate();
  const [fav, setFav] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (favs && favs.length > 0 && favs.includes(movie.imdbID)) {
      setFav(true);
    }
  }, [favs, movie.imdbID]);

  const handleWishList = async () => {
    if (!auth?.name) {
      showToast("You have to login first!!", "");
      return;
    }
    try {
      if (!fav) {
        await axiosPrivate.post("/add-to-favorites", {
          movieId: movie.imdbID,
        });
        showToast("", "added successfully!!");
        setFav(true);
      } else {
        await axiosPrivate.delete(`/remove-from-favorites/${movie.imdbID}`);
        showToast("", "removed successfully!!");
        setFav(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={movie.imdbID} className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"}
        alt={movie.Title}
      />
      <div className="movie-details">
        <p>{movie.Title}</p>
      </div>
      {!(from === "favs") && (
        <button className="wishlist-button" onClick={handleWishList}>
          {fav ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
};

export default MovieCard;
