import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Character, Film } from "../types/Film";

type FlatListRef = React.RefObject<FlatList>;

const FilmCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { film } = route.params as { film: Film };
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef: FlatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex]);

  const handleEndReached = () => {
    setCurrentIndex(
      (currentIndex + 1) % film.characterConnection.characters.length,
    );
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <TouchableOpacity onPress={() => navigateToCharacterCard(item)}>
      <View style={styles.character}>
        <Text style={styles.characterName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const releaseDate = new Date(film.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigateToCharacterCard = (character: Character) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate("Character", { character });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{film.title}</Text>

        <Image source={require("../assets/film.png")} style={styles.image} />

        <Text style={styles.text}>Release date: {releaseDate}</Text>

        <Text style={styles.text}> Description:</Text>

        <ScrollView style={styles.openingCrawlContainer}>
          <Text style={styles.openingCrawl}>{film.openingCrawl}</Text>
        </ScrollView>

        <View style={styles.count}>
          <View style={styles.column}>
            <Text style={styles.text}>Total Species:</Text>
            <Text style={styles.number}>
              {film.speciesConnection.totalCount}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>Total Planets:</Text>
            <Text style={styles.number}>
              {film.planetConnection.totalCount}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>Total Vehicle:</Text>
            <Text style={styles.number}>
              {film.vehicleConnection.totalCount}
            </Text>
          </View>
        </View>

        <View style={styles.characterSlider}>
          <Text style={styles.text}>Characters:</Text>

          <FlatList
            ref={flatListRef}
            data={film.characterConnection.characters}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderCharacter}
            keyExtractor={(item) => item.id}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  number: {
    color: "red",
    fontWeight: "bold",
    fontSize: 19,
    textAlign: "center",
  },
  openingCrawlContainer: {
    marginTop: 10,
    maxHeight: 300,
  },
  openingCrawl: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  count: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  column: {
    minWidth: 100,
    justifyContent: "space-between",
    marginBottom: 10,
  },

  characterSlider: {
    marginTop: 20,
    height: 100,
    width: "100%",
  },
  character: {
    width: 150,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
  },
  characterName: {
    color: "#fff",
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 10,
  },
});
export default FilmCard;
