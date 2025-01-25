import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BarChart } from "react-native-gifted-charts";

export default function Main_barchart() {
  const [selectedDate, setSelectedDate] = useState(null);

  const data = [
    { value: 1500, label: "Mon", date: "JAN 01" },
    { value: 2150, label: "Tue", date: "JAN 02" },
    { value: 1930, label: "Wed", date: "JAN 03" },
    { value: 1300, label: "Thu", date: "JAN 04" },
    { value: 2400, label: "Fri", date: "JAN 05" },
    { value: 2100, label: "Sat", date: "JAN 06" },
    { value: 1700, label: "Sun", date: "JAN 07" },
  ];

  // 参考线值
  const referenceLineValue = 1700;

  // 处理数据，动态调整透明度
  const updatedData = data.map((item) => ({
    ...item,
    frontColor:
      item.value >= referenceLineValue
        ? "rgba(241, 111, 152, 1)"
        : "rgba(241, 111, 152, 0.4)",
  }));

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <BarChart
        maxValue={Math.max(...data.map((item) => item.value)) + 400}
        data={updatedData}
        barWidth={22}
        spacingAuto
        hideRules
        width={400}
        height={170}
        barBorderRadius={5}
        hideYAxisText={true}
        yAxisThickness={0}
        xAxisThickness={2}
        xAxisLabelTextStyle={{
          fontSize: 14, // 调整字体大小
          fontWeight: "800", // 设置字体粗细
          color: "(32,32,32,1)",
        }}
        showReferenceLine1
        referenceLine1Position={referenceLineValue}
        referenceLine1Config={{
          color: "gray",
          dashWidth: 4,
          dashGap: 6,
          thickness: 1,
          labelText: `${referenceLineValue} cal`,
          labelTextStyle: {
            color: "#FF3399",
            fontSize: 15,
            fontWeight: "bold",
            left: -5,
          },
        }}
        // 处理点击事件
        onBarPress={(item, index) => {
          setSelectedDate(item.date);
        }}
        // 自定义tooltip
        renderTooltip={(item, index) => {
          return (
            <View
              class="z-40 ..."
              style={{
                left: -10,
                marginBottom: 7,
                borderColor: "#F16F98",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {item.date}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
