import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { getPokemonAbilityApi, getPokemonByIdApi } from "../helpers/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pokeColours } from "../helpers/pokemon-type-colours";
import PokemonDetails from "../components/PokemonDetails";
import StatChart from "../components/StatChart";
import AbilitiesSection from "../components/AbilitiesSection";
import axios from "axios";

export default function Detail({ route, navigation }) {
  const { itemId, imgUrl } = route.params;
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const getPokemonDetails = async (pokemonID) => {
    getPokemonByIdApi(pokemonID).then((response) => {
      const details = response.data;
      setPokemonData(details);
      setIsLoading(false);
    });
  };

  const getPokemonAbilities = async (data) => {
    for(let i = 0; i<data.length; i++){
      axios.get(data[i].ability.url).then((response) => {
        const lang = response.data.effect_entries[1].language.name == "en" ? 1 : 0;
        const abilityData = response.data.effect_entries[lang].short_effect;
        setPokemonAbilities(pokemonAbilities => [...pokemonAbilities, abilityData])
      })  
    }
  }

  useEffect(() => {
    getPokemonDetails(itemId);
  }, []);

  useEffect(() => {
    getPokemonAbilities(pokemonData.abilities);
  }, [pokemonData]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: "column",
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{
            flex: 1,
            flexDirection: "row",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <PokemonDetails imgUrl={imgUrl} data={pokemonData} id={itemId} />
          <StatChart data={pokemonData.stats} />
          <AbilitiesSection name={pokemonData.abilities} desc={pokemonAbilities} data={pokemonData}/>
        </ScrollView>
      )}
    </View>
  );
}
