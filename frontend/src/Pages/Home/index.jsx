import React, { useState } from "react";
import "./index.css";
import GenreMovies from "./GenreMovies";
import Search from "./Search";

const genres = [
  "Action",
  "Comedy",
  "Horror",
  "Family",
  "Science",
  "Adventure",
  "Drama",
  "Fantasy",
  "Romance",
  "Thriller",
  "Documentary",
  "Animation",
  "Mystery",
  "Crime",
  "Music",
  "History",
  "War",
  "Western",
  "Biography",
  "Sport",
];

const ActiveSlider = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="cont">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="genre-cards-container">
        {searchQuery ? (
          <Search query={searchQuery.trim()} />
        ) : (
          genres.map((genre) => <GenreMovies key={genre} genre={genre} />)
        )}
      </div>
    </div>
  );
};

export default ActiveSlider;
