import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const ReadFolder = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        // Make a request to the backend to fetch user's favorite movies
        const response = await axios.get('http://localhost:3001/api/favorite-movies');
        const favoriteMovieIds = response.data; // Assuming backend returns movie IDs
        console.log(favoriteMovieIds)
        // For each favorite movie ID, fetch movie details from OMDb API
        const moviesData = await Promise.all(
          favoriteMovieIds.map(async (movieId) => {
            const movieResponse = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=e494a74a`);
            console.log(movieResponse)
            return movieResponse.data;
          })
        );

        // Set the fetched movie details to state
        setFavoriteMovies(moviesData);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, []);

  return (
    <div>
      <h1>Favorite Movies</h1>
      <div>
        {favoriteMovies.map((movie) => (
          <div key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadFolder;