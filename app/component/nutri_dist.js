import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import React from "react";
export default function dist_chart() {
  const barData = [{ value: 200 }, { value: 200 }, { value: 200 }];
  return (
    <View>
      <BarChart
        horizontal
        frontColor="#000000"
        data={barData}
        barWidth={2}
        xAxisThickness={0}
        yAxisThickness={0}
        hideYAxisText
        height={100}
        width={100}
        backgroundColor="#FFFFFF"
        hideXAxisText
      />
    </View>
  );
}
const style = StyleSheet.create({});
