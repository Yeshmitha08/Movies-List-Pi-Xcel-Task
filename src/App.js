import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/movies');
      const payload = await response.json();
      setMovies(payload.data);
    }

    getData();
  }, []);

  const getMovie = async (id) => {
    const response = await fetch(`/api/movies/${id}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  if (selectedMovie) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="details-container">
            <button
              className="back-button"
              onClick={() => setSelectedMovie(null)}
            >
              ← Back to Movies
            </button>

            <h1>{selectedMovie.title}</h1>

            <p>
              <b>Tagline:</b> {selectedMovie.tagline || "No tagline"}
            </p>

            <p>
              <b>Overview:</b> {selectedMovie.overview || "No overview available"}
            </p>

            <p>
              <b>Release Date:</b> {selectedMovie.release_date || "N/A"}
            </p>

            <p>
              <b>Runtime:</b> {selectedMovie.runtime} mins
            </p>

            <p>
              <b>Status:</b> {selectedMovie.status}
            </p>

            <p>
              <b>Rating:</b> ⭐ {selectedMovie.vote_average}/10
            </p>

            <p>
              <b>Vote Count:</b> {selectedMovie.vote_count}
            </p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          overflowY: "scroll",
          height: "100vh",
          justifyContent: "flex-start",
          paddingTop: "20px"
        }}
      >
        <h1>🎬 Movie Explorer</h1>

        <div className="movie-grid">
          {movies.slice(0, 20).map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => getMovie(movie.id)}
            >
              <h2 className="movie-title">{movie.title}</h2>

              <p>
                {movie.tagline || "No tagline available"}
              </p>

              <p className="rating">
                ⭐ {movie.vote_average}/10
              </p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;