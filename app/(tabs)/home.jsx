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
import icons from "../../constants/icons";
import { router } from "expo-router/build";
import Main_barchart from "../component/barchart";
import Dist_chart from "../component/nutri_dist";
import Dount_chart from "../component/donut_chart";
const App = () => {
  const goal_cal = 2400;
  const cal_count = 1800;

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
        <View style={styles.calories_row}>
          <View>
            <Text style={styles.calories_title}>Total cal Today:</Text>
            <Text style={styles.calories}>
              <Text style={styles.calories_count}>{cal_count}</Text> Cal
            </Text>
          </View>
          <View>
            <Text style={styles.calories_title}>Need for today:</Text>
            <Text style={styles.calories_2}>
              <Text style={styles.calories_count_2}>
                {goal_cal - cal_count}
              </Text>
              Cal
            </Text>
          </View>
        </View>
        <View style={styles.barchart_container}>
          <Main_barchart />
        </View>
      </View>
      <View className="flex-row justify-evenly">
        <View style={styles.chart_container}>
          <Dist_chart />
        </View>
        <View style={styles.chart_container}>
          <Dount_chart />
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
    width: "90%",
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
  calories_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calories_title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#606060",
  },
  calories_2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#606060",
  },
  calories_count: {
    color: "#D17A99",
    fontWeight: 600,
  },
  calories_count_2: {
    color: "#0080FF",
    fontWeight: 600,
  },
  barchart_container: {
    width: "100%", // 修改为百分比
    height: 220,
    alignSelf: "center",
    overflow: "hidden", // 防止超出容器
  },
  chart_container: {
    backgroundColor: "#FDB5C5",
    width: "43%",
    height: "180",
    borderRadius: 15,
  },
});

export default App;
