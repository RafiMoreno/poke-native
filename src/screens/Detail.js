import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { getPokemonByIdApi } from "../helpers/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pokeColours } from "../helpers/pokemon-type-colours";
import PokemonDetails from "../components/PokemonDetails";

export default function Detail({ route, navigation }) {
  const { itemId, imgUrl } = route.params;
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const getPokemonDetails = async (pokemonID) => {
    getPokemonByIdApi(pokemonID).then((response) => {
        const details = response.data;
        setPokemonData(details);
        setIsLoading(false);
    });
  };

   useEffect(() => {
    getPokemonDetails(itemId);
   }, []);
  

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
        flexDirection: "column",
      }}
    >  
      {isLoading ? (<ActivityIndicator size="large" style={{ flex: 1, flexDirection:"row", width:50, height: 50, justifyContent:"center", alignSelf:"center"}}/>) : (<PokemonDetails imgUrl={imgUrl} data={pokemonData} id={itemId} />) }
    </View>
  );
}
