import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LikedCharactersContext } from "../components/LikedCharactersContext";
import { Character } from "../types/Film";
import { useNavigation } from "@react-navigation/native";

export const CharacterScreen = () => {
  const { likedCharacters } = useContext(LikedCharactersContext);
  const navigation = useNavigation();
  const navigateToCharacterCard = (character: Character) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate("Character", { character });
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <TouchableOpacity onPress={() => navigateToCharacterCard(item)}>
      <View style={styles.character}>
        <Image source={require("../assets/person.png")} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {likedCharacters.length > 0 ? (
        <FlatList
          data={likedCharacters}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noCharactersText}>No liked characters yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  flatListContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
  },
  character: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  text: {
    color: "#fff",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  noCharactersText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
