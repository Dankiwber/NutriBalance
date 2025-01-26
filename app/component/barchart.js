import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

export default function MainBarChart() {
  const data = [
    { value: 1800, label: "Mon", date: "JAN 01" },
    { value: 2150, label: "Tue", date: "JAN 02" },
    { value: 1930, label: "Wed", date: "JAN 03" },
    { value: 1300, label: "Thu", date: "JAN 04" },
    { value: 2400, label: "Fri", date: "JAN 05" },
    { value: 2100, label: "Sat", date: "JAN 06" },
    { value: 1700, label: "Sun", date: "JAN 07" },
  ];

  const referenceLineValue = 1800;

  // 更新数据以调整透明度
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
        maxValue={Math.max(...data.map((item) => item.value)) + 450}
        data={updatedData}
        barWidth={22}
        spacingAuto
        hideRules
        width={400}
        height={170}
        barBorderRadius={5}
        hideYAxisText
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisLabelTextStyle={{
          fontSize: 14,
          fontWeight: "700",
          color: "rgb(32,32,32)",
        }}
        renderTooltip={(item) => (
          <View
            style={{
              padding: 5,
              left: -20,
              borderRadius: 5,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#0080FF",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              {item.date}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "rgba(255, 51, 153, 1)",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              {`${item.value}cal`}
            </Text>
          </View>
        )}
        showReferenceLine1
        referenceLine1Position={referenceLineValue}
        referenceLine1Config={{
          color: "rgba(0, 0, 0, 0.2)",
          dashWidth: 4,
          dashGap: 6,
          thickness: 2,
        }}
      />
    </View>
  );
}
