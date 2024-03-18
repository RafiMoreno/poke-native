import React from "react";
import { Text, View } from "react-native";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { pokeColours } from "../helpers/pokemon-type-colours";

export default function AbilitiesSection({ name, desc, data }) {
  let [fontsLoaded, fontError] = useFonts({
    Signika_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const mainType = data.types[0].type.name;
  return (
    <View style={{ marginBottom: 60 }}>
      <Text style={{ marginVertical: 10, fontWeight: 500, fontSize: 22, fontFamily:"Signika_500Medium" }}>
        Abilities
      </Text>
      {desc.map((element, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: pokeColours[mainType],
              flexDirection: "column",
              marginBottom: 10,
              gap: 4,
              borderRadius: 15,
              paddingHorizontal: 6,
              paddingVertical: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1.8,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily:"Signika_500Medium" }}>
              {name[index].ability.name.charAt(0).toUpperCase() +
                name[index].ability.name.slice(1)}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: 500, color: "white", fontFamily:"Signika_500Medium" }}>
              {element}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
