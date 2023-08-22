import { ParamListBase } from "@react-navigation/native";
import { Character } from "./Character";

export interface Film {
  id: string;
  title: string;
  releaseDate: string;
  openingCrawl: string;
  planetConnection: {
    totalCount: number;
  };
  speciesConnection: {
    totalCount: number;
  };
  starshipConnection: {
    totalCount: number;
  };
  vehicleConnection: {
    totalCount: number;
  };
  characterConnection: {
    characters: Character[];
  };
}

export type RootStackParamList = ParamListBase & {
  Films: undefined;
  FilmCard: { film: Film };
};

export { Character };
