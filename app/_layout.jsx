import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import React from "react";
const index = () => {
  return <Slot />;
};

export default index;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
