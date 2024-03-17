import React from "react"
import { Text, Image, View } from "react-native"
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika"

export default function PokemonBox ({name, img}) {
    let [fontsLoaded, fontError] = useFonts({
        Signika_500Medium,
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }
    return (
        <View style={{alignItems:"center"}}>
                <Image 
                style={{
                    width: 150, 
                    height: 150, 
                    borderWidth: 2, 
                    borderColor:"black",
                    borderRadius: 5,
                    backgroundColor: "#abdbe3",
                }} 
                source={{uri: img}}
                />
                <Text style={{
                    fontWeight:"700", 
                    fontSize:18,
                    fontFamily:"Signika_500Medium"
                }}>{name}</Text>
        </View>
    )
}