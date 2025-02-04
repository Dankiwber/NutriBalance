import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import icons from "../../constants/icons";
import { router } from "expo-router/build";
import Main_barchart from "../component/barchart";
import ProgressBar from "../component/nutri_dist";
import Dount_chart from "../component/donut_chart";
const App = () => {
  const [nutri_goal, setNurti_goal] = useState([0, 0, 0]);
  const [cal_count, setCal_count] = useState(0);
  const [goal_cal, setGoal_cal] = useState(0);
  const goal_dist = [85, 225, 275];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const info = await SecureStore.getItemAsync("userInfo");
        const userInfo = JSON.parse(info);
        const userGoal = userInfo["daily_goal"];
        setGoal_cal(userGoal);
        const data = await SecureStore.getItemAsync("userData");
        const userData = JSON.parse(data);
        const daily_arr = [
          Math.round((userData["daily_intake"][0] / goal_dist[0]) * 100),
          Math.round((userData["daily_intake"][1] / goal_dist[1]) * 100),
          Math.round((userData["daily_intake"][2] / goal_dist[2]) * 100),
        ];
        setNurti_goal(daily_arr);
        setCal_count(userData["daily_intake"][3]);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

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
      <ScrollView>
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
        <View style={styles.two_chart_container}>
          <View style={styles.chart_container}>
            <Text style={styles.nutri_dist_text}>Nutrition distribution</Text>
            <ProgressBar
              label="Fat"
              progress={nutri_goal[0]}
              duration={1500}
              color="#007387"
            />
            <ProgressBar
              label="Carb"
              progress={nutri_goal[1]}
              duration={1500}
              color="#C2537C"
            />
            <ProgressBar
              label="Protein"
              progress={nutri_goal[2]}
              duration={1500}
              color="#8B5ECC"
            />
          </View>
          <View style={styles.chart_container}>
            <Dount_chart />
            <View style={styles.bulletContainer}>
              {/* Fat */}
              <View style={styles.bulletItem}>
                <View
                  style={[styles.bulletCircle, { backgroundColor: "#007387" }]}
                />
                <Text style={styles.bulletText}>Fat</Text>
              </View>
              {/* Carb */}
              <View style={styles.bulletItem}>
                <View
                  style={[styles.bulletCircle, { backgroundColor: "#C2537C" }]}
                />
                <Text style={styles.bulletText}>Carb</Text>
              </View>
              {/* Protein */}
              <View style={styles.bulletItem}>
                <View
                  style={[styles.bulletCircle, { backgroundColor: "#8B5ECC" }]}
                />
                <Text style={styles.bulletText}>Protein</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            height: 135,
            borderRadius: 15,
            width: "90%",
            backgroundColor: "#BCE2F2",
            alignSelf: "center",
          }}
        ></View>
      </ScrollView>
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
  two_chart_container: {
    flexDirection: "row",
    width: "92%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  chart_container: {
    marginTop: 5,
    backgroundColor: "#FDB5C5",
    width: "48%",
    height: 180,

    borderRadius: 15,
    padding: 0,
  },
  nutri_dist_text: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#6666FF",
    marginLeft: 5,
  },
  bulletContainer: {
    marginTop: 7,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10, // 左右边距
  },
  bulletItem: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  bulletCircle: {
    width: 10,
    height: 10,
    borderRadius: 4, // 圆形
    marginRight: 2, // 圆圈与文本的间距
  },
  bulletText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#000000", // 文本颜色
  },
});

export default App;
