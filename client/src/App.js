import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from "./Movies/AddMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
    .then(response => {
      console.log("Use Effect axios call: ", response.data)
      setMovies(response.data);
    })
    .catch(error => {
      console.log(error.message);
    })
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact path="/"
        render={props => {
          return <MovieList
                   {...props}
                   movies={movies}
                 />;
        }}  
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie
                   {...props}
                   addToSavedList={addToSavedList}
                   movies={movies}
                   setMovies={setMovies}
                 />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie
                   {...props}
                   movies={movies}
                   setMovies={setMovies}
                 />;
        }}
      />
      <Route
        path="/add-movie/"
        render={props => {
          return <AddMovie
                   {...props}
                   movies={movies}
                   setMovies={setMovies}
                 />           
        }}
      />
    </>
  );
};

export default App;
