import React from "react";
import { Text, Image, View, FlatList, StyleSheet } from "react-native";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { pokeColours } from "../helpers/pokemon-type-colours";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function PokemonDetails({ data, imgUrl, id }) {
  let [fontsLoaded, fontError] = useFonts({
    Signika_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const mainType = data.types[0].type.name;
  return (
    <View>
      <Image
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          borderRadius: 300,
          backgroundColor: pokeColours[mainType],
          marginBottom: 24,
        }}
        source={{ uri: imgUrl }}
      />
      <Text style={{ alignSelf: "start", fontWeight: 700, fontSize: 28 }}>
        {formattedName}
      </Text>
      <Text
        style={{
          alignSelf: "start",
          fontWeight: 600,
          fontSize: 20,
          color: "grey",
          marginBottom: 12,
        }}
      >
        No. {id}
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {data.types.map((element, index) => {
          return (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: pokeColours[element.type.name],
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {element.type.name.charAt(0).toUpperCase() +
                  element.type.name.slice(1)}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", gap: 10, paddingVertical: 8 }}>
      <MaterialIcons name="height" size={24} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {(data.height * 0.1).toFixed(1)} m
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10, paddingVertical: 4 }}>
      <FontAwesome6 name="weight-hanging" size={24} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {(data.weight * 0.1).toFixed(1)} Kg
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "Signika_500Medium",
  },
});
