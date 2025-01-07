import { View, Text, Button } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white ">
      <Text className="text-3xl font-pblack font-bold"> Nturibalance</Text>
      <StatusBar style="auto" />
      <Button title="Go to login" onPress={() => router.push("/signin")} />
    </View>
  );
}
