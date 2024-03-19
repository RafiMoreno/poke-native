import React from "react";
import { Text, View } from "react-native";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { BarChart } from "react-native-gifted-charts";

export default function StatChart(data) {
  const statData = data.data;
  const barData = [
    { value: statData[0].base_stat, label: "HP", frontColor: "#FF0000"  },
    { value: statData[1].base_stat, label: "Att", frontColor: "#FFA500" },
    { value: statData[2].base_stat, label: "Def", frontColor: "#FFFF00" },
    { value: statData[3].base_stat, label: "Sp.Att", frontColor: "#ADD8E6" },
    { value: statData[4].base_stat, label: "Sp.Def", frontColor: "#90EE90" },
    { value: statData[5].base_stat, label: "Speed", frontColor: "#FFC0CB" },
  ];
  let [fontsLoaded, fontError] = useFonts({
    Signika_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{paddingVertical: 12}}>
      <Text style={{ marginVertical: 10, fontWeight: 500, fontSize: 22, fontFamily:"Signika_500Medium" }}>
        Base Stats
      </Text>
      <BarChart
        isAnimated
        hideRules
        barWidth={26}
        noOfSections={5}
        barBorderRadius={4}
        data={barData}
        yAxisThickness={1}
        xAxisThickness={1}
        maxValue={255}
      />
      <Text></Text>
    </View>
  );
}
