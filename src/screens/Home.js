import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAllPokemonApi } from "../helpers/api";
import PokemonBox from "../components/PokemonBox";

export default function Home({ navigation }) {
  const insets = useSafeAreaInsets();
  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  const [pokemonData, setPokemonData] = useState([]);
  const getAllPokemon = () => {
    getAllPokemonApi(60, 0).then((response) => {
      const allPokemon = response.data.results;
      setPokemonData(allPokemon);
    });
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ScrollView>
        <Image
          style={{ height: 70, width: 350, alignSelf: "center" }}
          source={require("../assets/Header.png")}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pokemonData.map((pokemon, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", {
                    itemId: index + 1,
                    imgUrl: imgUrl + (index + 1) + ".png"
                  });
                }}
              >
                <PokemonBox
                  key={index}
                  name={
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                  }
                  img={imgUrl + (index + 1) + ".png"}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    backgroundColor: "red",
    padding: 20,
  },
});
