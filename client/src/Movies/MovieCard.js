import React from 'react';

const MovieCard = props => {

  const { title, director, metascore, stars } = props.movie;

  return (
    <div className="movie-card">
      <div className="movie-top">
        <h2>{title}</h2>
        {/* <Link to={`/update-movie/${props.movie.id}`}><button className="edit-btn"> 🖊 </button></Link> */}
      </div>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
