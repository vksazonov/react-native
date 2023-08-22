import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, Image } from "react-native";
import { Character } from "../types/Character";
import { LikedCharactersContext } from "./LikedCharactersContext";
import { FilmReference } from "../types/FilmReference";

const CharacterCard = () => {
  const { likedCharacters, setLikedCharacters } = useContext(
    LikedCharactersContext,
  );
  const route = useRoute();
  const { character } = route.params as { character: Character };
  const films = character.filmConnection.films;

  const toggleLike = () => {
    if (
      likedCharacters.some(
        (likedCharacter) => likedCharacter.name === character.name,
      )
    ) {
      const updatedLikedCharacters = likedCharacters.filter(
        (likedCharacter) => likedCharacter.name !== character.name,
      );
      setLikedCharacters(updatedLikedCharacters);
    } else {
      setLikedCharacters([...likedCharacters, character]);
    }
  };

  const renderFilm = ({ item }: { item: FilmReference }) => (
    <View>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>

      <Image source={require("../assets/person.png")} style={styles.image} />

      <Text style={styles.h2}>Biographical information</Text>

      <View style={styles.cells}>
        <Text style={styles.text}>Homeworld</Text>
        <Text style={styles.text}>{character.homeworld.name}</Text>
      </View>

      <View style={styles.cells}>
        <Text style={styles.text}>Date of birth</Text>
        <Text style={styles.text}>{character.birthYear}</Text>
      </View>

      <Text style={styles.h2}>Descriptive information</Text>

      <View style={styles.cells}>
        <Text style={styles.text}>Height</Text>
        <Text style={styles.text}>{character.height}</Text>
      </View>

      <View style={styles.cells}>
        <Text style={styles.text}>Mass</Text>
        <Text style={styles.text}>{character.mass}</Text>
      </View>

      <Text style={styles.h2}>Films he has appeared</Text>

      <FlatList data={films} renderItem={renderFilm} />

      <Button
        title={
          likedCharacters.includes(character)
            ? "Remove from favourites"
            : "Add to favourites"
        }
        onPress={() => toggleLike()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  text: {
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 10,
  },
  cells: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default CharacterCard;
