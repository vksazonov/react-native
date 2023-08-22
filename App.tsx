import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FilmsScreen } from "./screens/FilmsScreen";
import { CharacterScreen } from "./screens/CharacterScreen";
import FilmCard from "./components/FilmCard";
import CharacterCard from "./components/CharacterCard";
import { Character } from "./types/Film";
import { LikedCharactersContext } from "./components/LikedCharactersContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FilmsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen name="Films" component={FilmsScreen} />
    <Stack.Screen name="Film" component={FilmCard} />
    <Stack.Screen name="Character" component={CharacterCard} />
  </Stack.Navigator>
);

export default function App() {
  const [likedCharacters, setLikedCharacters] = useState<Character[]>([]);

  return (
    <LikedCharactersContext.Provider
      value={{ likedCharacters, setLikedCharacters }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Episodes"
            component={FilmsStackNavigator}
            options={{
              tabBarStyle: { backgroundColor: "#000" },
              tabBarLabelStyle: { color: "#fff" },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Favourites"
            component={CharacterScreen}
            options={{
              tabBarStyle: { backgroundColor: "#000" },
              tabBarLabelStyle: { color: "#fff" },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LikedCharactersContext.Provider>
  );
}
