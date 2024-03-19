import React from "react";
import { Text, View } from "react-native";
import { useFonts, Signika_500Medium } from "@expo-google-fonts/signika";
import { BarChart } from "react-native-gifted-charts";

export default function CompareBarChart({data1, data2}) {
  const barData = [
    {
      value: data1[0],
      label: "HP",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[0], frontColor: "#ED6665" },
    {
      value: data1[1],
      label: "Att",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[1], frontColor: "#ED6665" },
    {
      value: data1[2],
      label: "Def",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[2], frontColor: "#ED6665" },
    {
      value: data1[3],
      label: "Sp.Att",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[3], frontColor: "#ED6665" },
    {
      value: data1[4],
      label: "Sp.Def",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[4], frontColor: "#ED6665" },
    {
      value: data1[5],
      label: "Spd",
      spacing: 2,
      labelWidth: 50,
      labelTextStyle: { color: "gray" },
      frontColor: "#D3D3D3",
    },
    { value: data2[5], frontColor: "#ED6665" },
  ];
  let [fontsLoaded, fontError] = useFonts({
    Signika_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            fontFamily:"Signika_500Medium"
          }}
        >
          Comparison Chart
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 24,
            backgroundColor: "yellow",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#D3D3D3",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 120,
                height: 16,
                color: "black",
              }}
            >
              First Pokemon
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#ED6665",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 120,
                height: 16,
                color: "black",
              }}
            >
              Second Pokemon
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingBottom: 40,
        paddingHorizontal: 12,
        borderRadius: 10,
      }}
    >
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={14}
        spacing={18}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={3}
        maxValue={255}
      />
    </View>
  );
}
