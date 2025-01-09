import { StyleSheet } from "react-native";
import { Slot, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";
import React from "react";
import "../global.css";

const Layout = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
