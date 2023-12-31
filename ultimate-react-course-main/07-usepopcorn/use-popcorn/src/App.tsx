import { ReactNode, useEffect, useState } from "react";
import { Movie, Watched } from "./types";
import "./App.css";

const average = (arr: number[]) =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

const KEY = "d4374359";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Watched[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApi() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong fetching movies");

        const json = (await res.json()) as { Search: Movie[] };
        setMovies(json.Search);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void fetchApi();
  }, []);

  return (
    <>
      <Nav>
        <Search query={query} onSetQuery={setQuery} />
        <NumResults moviesLength={movies.length} />
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorComponent message={error} />}
        </Box>
        <Box>
          <ListSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorComponent({ message }: { message: string }) {
  return (
    <p className="error">
      <span>⛔ {message}</span>
    </p>
  );
}

function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({
  query,
  onSetQuery,
}: {
  query: string;
  onSetQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

function NumResults({ moviesLength }: { moviesLength: number }) {
  return (
    <p className="num-results">
      Found <strong>{moviesLength}</strong> results
    </p>
  );
}

function ToggleButton({
  isOpen,
  onSetIsOpen,
}: {
  isOpen: boolean;
  onSetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="btn-toggle" onClick={() => onSetIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function Main({ children }: { children: ReactNode }) {
  return <main className="main">{children}</main>;
}

function Box({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function MovieItem({ movie }: { movie: Movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function ListSummary({ watched }: { watched: Watched[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <Stats
          imdbRating={avgImdbRating}
          userRating={avgUserRating}
          runtime={avgRuntime}
        />
      </div>
    </div>
  );
}

function WatchedList({ watched }: { watched: Watched[] }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedItem({ movie }: { movie: Watched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <Stats
          imdbRating={movie.imdbRating}
          userRating={movie.userRating}
          runtime={movie.runtime}
        />
      </div>
    </li>
  );
}

function Stats({
  imdbRating,
  userRating,
  runtime,
}: {
  imdbRating: number;
  userRating: number;
  runtime: number;
}) {
  return (
    <>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
    </>
  );
}
