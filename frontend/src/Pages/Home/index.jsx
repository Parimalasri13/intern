import './index.css';
import GenreMovies from './GenreMovies';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Family', 'Romance'];


const ActiveSlider = () => {

  return (
    <div className="cont">
    <div className="genre-cards-container">
        {genres && 
          genres.map((genre) => (
          <GenreMovies key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default ActiveSlider;
