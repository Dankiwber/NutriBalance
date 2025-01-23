import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
export default function Main_barchart() {
  return (
    <View>
      <BarChart
        data={[
          { value: 100 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
          { value: 150 },
        ]}
        barWidth={17}
        spacing={10}
        width={300} // 显式限制宽度，避免超出
      />
    </View>
  );
}
