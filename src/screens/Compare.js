import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { Dialog, ListItem, Avatar } from "@rneui/themed";
import { getAllPokemonApi } from "../helpers/api";

export default function Compare({ navigation }) {
  const [firstPokemon, setFirstPokemon] = useState([]);
  const [secondPokemon, setSecondPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const insets = useSafeAreaInsets();
  const placeholderImgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };

  const getAllPokemon = () => {
    getAllPokemonApi(151, 0).then((response) => {
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
            source={{ uri: placeholderImgUrl }}
            style={{ alignSelf: "center" }}
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
            source={{ uri: placeholderImgUrl }}
            style={{ alignSelf: "center" }}
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
      <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title title="Select 1st Pokemon" />
        {pokemonData.map((pokemon, i) => (
        <ListItem
          key={i}
          containerStyle={{
            marginHorizontal: -10,
            borderRadius: 8,
          }}
          onPress={toggleDialog1}
        >
          <Avatar rounded source={{ uri: imgUrl + i + ".png" }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '400' }}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      </Dialog>
      <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
        <Dialog.Title title="Select 2nd Pokemon" />
      </Dialog>
    </View>
  );
}
