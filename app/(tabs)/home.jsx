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
import { router } from "expo-router/build";
import Main_barchart from "../component/barchart";
const App = () => {
  const cal_count = 1800;
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
        <TouchableOpacity
          onPress={() => router.push("/create")}
          style={styles.Add_foot_buttom}
        >
          <Image
            style={styles.Add_foot_buttom_icon}
            source={icons.add_food}
            alt="LOGO"
          />
          <Text style={styles.Add_foot_buttom_text}>Add More Food</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.calories_title}>Total cal Today:</Text>
          <Text style={styles.calories}>
            <Text style={styles.calories_count}>{cal_count}</Text> Cal
          </Text>
        </View>
        <View style={styles.barchart_container}>
          <Main_barchart />
        </View>
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
    color: "#F16F98",
    fontSize: 27,
    fontWeight: 700,
  },
  header_container_avatar: {
    height: 45,
    width: 45,
  },
  container: {
    width: 360,
    height: 340,
    alignSelf: "center",
    marginTop: 15,
    padding: 20,
    backgroundColor: "#BCE2F2",
    borderRadius: 10,
  },
  Add_foot_buttom: {
    alignItems: "center",
    flexDirection: "row",
    width: 150,
    height: 34,
    backgroundColor: "#7CACC0",
    borderRadius: 10,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  Add_foot_buttom_icon: {
    height: 25,
    width: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  Add_foot_buttom_text: {
    fontWeight: 700,
    color: "#E0E0E0",
  },
  calories_title: {
    fontSize: 14,
    fontWeight: 100,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D17A99",
  },
  calories_count: {
    color: "#606060",
    fontWeight: 500,
  },
  barchart_container: {
    width: "100%", // 修改为百分比
    height: 220,
    alignSelf: "center",
    overflow: "hidden", // 防止超出容器
  },
});

export default App;
