import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { Dialog, ListItem, Avatar, CheckBox, Button } from "@rneui/themed";
import { getAllPokemonApi, getPokemonByIdApi } from "../helpers/api";
import CompareBarChart from "../components/CompareBarChart";

export default function Compare({ navigation }) {
  const [firstPokemon, setFirstPokemon] = useState([]);
  const [firstPokemonID, setFirstPokemonID] = useState();
  const [firstPokemonImg, setFirstPokemonImg] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
  );
  const [secondPokemon, setSecondPokemon] = useState([]);
  const [secondPokemonID, setSecondPokemonID] = useState();
  const [secondPokemonImg, setSecondPokemonImg] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
  );
  const [pokemonData, setPokemonData] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [chartData1, setChartData1] = useState([0, 0, 0, 0, 0, 0]);
  const [chartData2, setChartData2] = useState([0, 0, 0, 0, 0, 0]);
  const insets = useSafeAreaInsets();
  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };
  const handlePokemon1 = (data, idx) => {
    setFirstPokemon(data);
    setFirstPokemonImg(imgUrl + idx + ".png");
    setFirstPokemonID(idx);
  };
  const handlePokemon2 = (data, idx) => {
    setSecondPokemon(data);
    setSecondPokemonImg(imgUrl + idx + ".png");
    setSecondPokemonID(idx);
  };

  const getAllPokemon = () => {
    getAllPokemonApi(151, 0).then((response) => {
      const allPokemon = response.data.results;
      setPokemonData(allPokemon);
    });
  };

  const getChartData = () => {
    getPokemonByIdApi(firstPokemonID).then((response) => {
      const firstPokemonStats = response.data.stats;
      const stats1 = [];
      for(let i=0; i<firstPokemonStats.length; i++){
        stats1.push(firstPokemonStats[i].base_stat)
      }
      setChartData1(stats1);
    });
    getPokemonByIdApi(secondPokemonID).then((response) => {
      const secondPokemonStats = response.data.stats;
      const stats2 = [];
      for(let i=0; i<secondPokemonStats.length; i++){
        stats2.push(secondPokemonStats[i].base_stat)
      }
      setChartData2(stats2);
    });
  }

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
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Signika_500Medium",
          fontSize: 24,
          paddingTop: 8,
        }}
      >
        Compare Pokemon
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
          gap: 4,
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Image
            width={128}
            height={128}
            source={{
              uri: firstPokemonImg,
            }}
            style={{ alignSelf: "center", backgroundColor: "#D3D3D3", borderRadius: 100  }}
          />
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 15,
              elevation: 3,
              backgroundColor: "white",
            }}
            onPress={toggleDialog1}
          >
            <Text style={{ fontFamily: "Signika_500Medium", fontWeight: 600 }}>
              Choose Pokemon
            </Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Image
            width={128}
            height={128}
            source={{
              uri: secondPokemonImg,
            }}
            style={{ alignSelf: "center", backgroundColor: "#ED6665", borderRadius: 100 }}
          />
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 15,
              elevation: 3,
              backgroundColor: "white",
            }}
            onPress={toggleDialog2}
          >
            <Text style={{ fontFamily: "Signika_500Medium", fontWeight: 600 }}>
              Choose Pokemon
            </Text>
          </Pressable>
        </View>
      </View>
      {firstPokemon.length === 0 && secondPokemon.length === 0 ? (
        <Button
          disabled
          size="md"
          style={{ maxWidth: 200, alignSelf: "center", marginVertical: 14 }}
        >
          Compare
        </Button>
      ) : (
        <Button
          size="md"
          color={"#ED6665"}
          style={{ maxWidth: 200, alignSelf: "center", marginVertical: 14 }}
          onPress={() => getChartData()}
        >
          <Text style={{fontFamily: "Signika_500Medium", fontWeight: 600, color: "white", paddingHorizontal: 6, paddingVertical: 4}}>Compare</Text> 
        </Button>
      )}
      <CompareBarChart data1={chartData1} data2={chartData2}/>
      <Dialog
        isVisible={visible1}
        onBackdropPress={toggleDialog1}
        overlayStyle={{ height: 300 }}
      >
        <Dialog.Title title="Select 1st Pokemon" />
        <ScrollView>
          {pokemonData.map((pokemon, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: -10,
                borderRadius: 8,
              }}
              onPress={() => handlePokemon1(pokemonData[i], i + 1)}
            >
              <Avatar rounded source={{ uri: imgUrl + (i + 1) + ".png" }} />
              <Pressable>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "400" }}>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </ListItem.Title>
                </ListItem.Content>
              </Pressable>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>
      <Dialog
        isVisible={visible2}
        onBackdropPress={toggleDialog2}
        overlayStyle={{ height: 300 }}
      >
        <Dialog.Title title="Select 2nd Pokemon" />
        <ScrollView>
          {pokemonData.map((pokemon, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: -10,
                borderRadius: 8,
              }}
              onPress={() => handlePokemon2(pokemonData[i], i + 1)}
            >
              <Avatar rounded source={{ uri: imgUrl + (i + 1) + ".png" }} />
              <Pressable>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "400" }}>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </ListItem.Title>
                </ListItem.Content>
              </Pressable>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>
    </View>
  );
}
