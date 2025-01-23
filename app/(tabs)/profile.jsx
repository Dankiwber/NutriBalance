import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

const profile = () => {
  return (
    <View>
      <BarChart data={[{ value: 100 }, { value: 150 }]} />
    </View>
  );
};

export default profile;
