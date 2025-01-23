import React from "react";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import icons from "../../constants/icons";
const App = () => {
  const data = {
    labels: ["27", "28", "29", "30", "31", "1", "2"],
    datasets: [
      {
        data: [15, 30, 45, 60, 20, 80, 55],
      },
    ],
  };

  return (
    <>
      <View style={styles.header_container}>
        <Text style={styles.header_container_text}>Dashboard</Text>
        <View style={styles.header_container_avatar}>
          <Image
            style={styles.logo_container}
            source={icons.default_av}
            alt="LOGO"
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Total cal Today:</Text>
        <Text style={styles.calories}>1867 Cal</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header_container: {
    flexDirection: "row", // 让子元素在一行排列
    alignItems: "center", // 垂直居中对齐
    justifyContent: "space-between", // 在两端对齐，文本在左，头像在右
    height: 45,
    marginTop: 60,
    paddingHorizontal: 30,
  },
  logo_container: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  header_container_text: {
    fontSize: 27,
    fontWeight: 600,
  },
  header_container_avatar: {
    height: 45,
    width: 45,
  },
  container: {
    marginTop: 15,
    padding: 20,
    backgroundColor: "#D6E4F0",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calories: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#D17A99",
  },
});

export default App;
