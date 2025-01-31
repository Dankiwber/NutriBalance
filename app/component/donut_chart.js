import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import React from "react";
export default function dount_chart() {
  const pieData = [
    { value: 54, color: "#C2537C" },
    { value: 40, color: "#007387" },
    { value: 20, color: "#8B5ECC" },
  ];
  return (
    <View>
      <PieChart
        donut
        innerRadius={45}
        innerCircleColor="#FDB5C5"
        radius={75}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <View>
              <Text
                style={{ color: "black", fontSize: 14, textAlign: "center" }}
              >
                {" "}
                daily ratio{" "}
              </Text>
              <Text
                style={{
                  color: "#0080FF",
                  fontSize: 18,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {" "}
                3:4:4{" "}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({});
