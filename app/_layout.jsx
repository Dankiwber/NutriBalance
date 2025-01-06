import { StyleSheet } from "react-native";
import { Slot } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <>
      {/* 可以添加全局组件，例如 Header 或 Footer */}
      <Slot />
    </>
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
