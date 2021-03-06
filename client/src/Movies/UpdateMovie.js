import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

const UpdateMovie = props => {
  // const { title, director, metascore, stars } = props.movie;
  const [movie, setMovie] = useState({...initialState});

  useEffect(() => {
    const movieToUpdate = props.movies.filter(movie => {
      return movie.id === props.match.params.id
    })
    movieToUpdate && setMovie(movieToUpdate)
  }, [props.match.params.id])


  const handleChange = e => {
      if (e.target.name === "stars") {
          const stars = e.target.value.split(",");
          setMovie({...movie, [e.target.name]: stars});
      } else {
      setMovie({...movie, [e.target.name]: e.target.value})
    }
  }

  const saveMovie = e => {
      e.preventDefault();
      console.log(movie);
      axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        console.log(response);
        props.setMovies(props.movies.map(item => {
          if (item.id === movie.id) {
            return response.data;
          } else {
            return item;
          }
        }))
        props.history.push("/");
      })
      .catch(error => {
          console.log(error.message)
      })

      setMovie({...initialState});
  }

  return (
    <div className="update-form">
        <h3 className="update-title">Update Movie</h3>
      <form onSubmit={saveMovie} className="form">
        <div className="form-one-line">
          <div className="pair">
            <label htmlFor="title">Title</label>
            <input className="input-3-4" type="text" name="title" placeholder='...title' value={movie.title} onChange={handleChange} />
          </div>
          <div className="pair">
            <label htmlFor="metascore">Metascore</label>
            <input className="input-1-4" type="number" name="metascore" placeholder={100} value={movie.metascore} onChange={handleChange} />
          </div>
        </div>
        <div className="pair">
          <label htmlFor="director">Director</label>
          <input className="input" type="text" name="director" placeholder='...director' value={movie.director} onChange={handleChange} />
        </div>
        <div className="pair">
          <label htmlFor="stars">Actors</label>
          <input className="input" type="textfield" name="stars" placeholder='...actors, separated by commas' value={movie.stars} onChange={handleChange} />
        </div>
        <button className="update-btn" type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateMovie;