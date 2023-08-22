import { createContext } from "react";
import { Character } from "../types/Film";

interface LikedCharactersContextType {
  likedCharacters: Character[];
  setLikedCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export const LikedCharactersContext = createContext<LikedCharactersContextType>(
  {
    likedCharacters: [],
    setLikedCharacters: () => {},
  },
);
