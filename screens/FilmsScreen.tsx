import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import fetchFilmData from "../utils/fetch";
import { Film } from "../types/Film";
import { useNavigation } from "@react-navigation/native";

export const FilmsScreen = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [sortAscending, setSortAscending] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const processData = async () => {
      const films = await fetchFilmData();
      setFilms(films);
    };
    processData();
  }, []);

  const sortedFilms = [...films].sort((a, b) => {
    if (sortAscending) {
      return a.releaseDate.localeCompare(b.releaseDate);
    } else {
      return b.releaseDate.localeCompare(a.releaseDate);
    }
  });

  const navigateToFilmCard = (film: Film) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate("Film", { film });
  };

  const releaseDate = (releaseDate: string) =>
    new Date(releaseDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <View style={styles.wrap}>
      <View style={styles.button}>
        <Button
          title={sortAscending ? "Sort Old to New" : "Sort New to Old"}
          onPress={() => setSortAscending(!sortAscending)}
        />
      </View>

      <FlatList
        data={sortedFilms}
        renderItem={({ item }: { item: Film }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigateToFilmCard(item)}
          >
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.openingCrawl}>
              {item.openingCrawl.slice(0, 50).concat("...")}
            </Text>

            <Text style={styles.releaseDate}>
              {releaseDate(item.releaseDate)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#000",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    marginBottom: 1,
    backgroundColor: "#424242",
  },
  button: {
    marginBottom: 5,
    backgroundColor: "#000",
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
  },
  openingCrawl: {
    flex: 1,
    padding: 10,
    color: "white",
  },
  releaseDate: {
    flex: 1,
    textAlign: "right",
    color: "white",
  },
  image: {
    flex: 1,
    height: 100,
    marginRight: 10,
  },
});
