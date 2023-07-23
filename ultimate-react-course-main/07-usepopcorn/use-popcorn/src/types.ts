export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

export type Watched = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};
