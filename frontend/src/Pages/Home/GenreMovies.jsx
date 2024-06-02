// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './GenreMovies.css';

// const GenreMovies = ({ genre }) => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlist, setWishlist] = useState([]);
  
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(`http://www.omdbapi.com/?s=${genre}&apikey=e494a74a`);
//         if (response.data.Response === 'True') {
//           setMovies(response.data.Search);
//         } else {
//           setMovies([]);
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [genre]);

//   const toggleWishlist = (movie) => {
//     if (wishlist.includes(movie.imdbID)) {
//       setWishlist(wishlist.filter((id) => id !== movie.imdbID));
//     } else {
//       setWishlist([...wishlist, movie.imdbID]);
//     }
//   };

//   const isInWishlist = (movieId) => wishlist.includes(movieId);

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 1024 },
//       items: 4,
//     },
//     desktop: {
//       breakpoint: { max: 1024, min: 768 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 768, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <div className="genre-movies">
//       <h3 style={{marginLeft:"20px"}}>{genre}</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Carousel responsive={responsive} infinite autoPlay>
//           {movies.map((movie) => (
//             <div key={movie.imdbID} className="movie-card">
//               <img src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'} alt={movie.Title} />
//               <div className="movie-details">
//                 <p>{movie.Title}</p>
//                 <button className="wishlist-button" onClick={() => toggleWishlist(movie)}>
//                   <span role="img" aria-label="heart">
//                     {isInWishlist(movie.imdbID) ? '❤️' : '🤍'}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default GenreMovies;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './GenreMovies.css';

const GenreMovies = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // State to keep track of user's favorite movies

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${genre}&apikey=e494a74a`);
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  const toggleWishlist = async (movie) => {
    try {
      const response = await axios.post('http://localhost:3001/add-to-favorites', {
        userId: "665acf6ee309a48467c30908", // Replace 'user-id' with actual user ID
        movieId: movie.imdbID
      });
      // Assuming your backend returns updated favorites after adding/removing a movie
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const isInFavorites = (movieId) => favorites.includes(movieId);

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
        <p>Loading...</p>
      ) : (
        <Carousel responsive={responsive} infinite autoPlay>
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'} alt={movie.Title} />
              <div className="movie-details">
                <p>{movie.Title}</p>
                <button className="wishlist-button" onClick={() => toggleWishlist(movie)}>
                  <span role="img" aria-label="heart">
                    {isInFavorites(movie.imdbID) ? '❤️' : '🤍'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default GenreMovies;
