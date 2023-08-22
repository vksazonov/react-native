import { FilmReference } from "./FilmReference";

export interface Character {
  id: string;
  name: string;
  birthYear: string;
  height: string;
  mass: string;
  filmConnection: {
    films: FilmReference[];
  };
  homeworld: {
    id: string;
    name: string;
  };
}
