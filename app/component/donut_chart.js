import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
export default function dount_chart() {
  return (
    <View style={style.chart_container}>
      <Text>NO</Text>
    </View>
  );
}
const style = StyleSheet.create({
  chart_container: {
    backgroundColor: "#FDB5C5",
    width: "43%",
    height: "180",
    borderRadius: 15,
  },
});
