import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const ratio_cal = (fat, carb, pro) => {
  const total = fat + carb + pro;

  // 如果总和为 0，返回默认比例
  if (total === 0) return "0:0:0";

  // 计算比例
  const fat_ratio = Math.round((fat / total) * 10);
  const carb_ratio = Math.round((carb / total) * 10);
  const prot_ratio = Math.round((pro / total) * 10);

  // 处理四舍五入的误差
  const ratios = [fat_ratio, carb_ratio, prot_ratio];
  const sum = ratios.reduce((acc, val) => acc + val, 0);

  if (sum !== 10) {
    const diff = 10 - sum;
    const maxIndex = ratios.indexOf(Math.max(...ratios));
    ratios[maxIndex] += diff;
  }

  // 解构最终比例
  const [finalFatRatio, finalCarbRatio, finalProtRatio] = ratios;

  // 输出比例字符串
  const ratioString = `${finalFatRatio}:${finalCarbRatio}:${finalProtRatio}`;
  return ratioString;
};

export default function DountChart() {
  const [fat_count, setFat_count] = useState(0);
  const [carb_count, setCarb_count] = useState(0);
  const [prot_count, setProt_count] = useState(0);
  const [ratio, setRatio] = useState("0:0:0");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await SecureStore.getItemAsync("userData");
        const userData = JSON.parse(data);

        const fat = parseInt(userData["daily_intake"][0]);
        const carb = parseInt(userData["daily_intake"][1]);
        const prot = parseInt(userData["daily_intake"][2]);

        setFat_count(fat);
        setCarb_count(carb);
        setProt_count(prot);
        setRatio(ratio_cal(fat, carb, prot));
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const pieData = [
    { value: fat_count || 0, color: "#C2537C" },
    { value: carb_count || 0, color: "#007387" },
    { value: prot_count || 0, color: "#8B5ECC" },
  ].filter((item) => item.value > 0); // 过滤掉值为 0 的数据

  return (
    <View style={styles.container}>
      <PieChart
        donut
        innerRadius={45}
        innerCircleColor="#FDB5C5"
        radius={70}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <View>
              <Text style={styles.centerLabelText}>Daily ratio:</Text>
              <Text style={styles.centerLabelRatio}>{ratio}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: "center",
  },
  centerLabelText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  centerLabelRatio: {
    color: "#0080FF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
