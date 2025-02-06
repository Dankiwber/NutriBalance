import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
export default function MainBarChart({ userData }) {
  const [usedat_arr, setdat_arr] = useState([]);
  const [useintake_arr, setintake_arr] = useState([]);

  const fetchUserData = async () => {
    const dat_arr = [];
    const intake_arr = [];
    for (const key in userData["weekly_intake"]) {
      intake_arr.push(String(userData["weekly_intake"][key]));
      const [year, month, day] = key.split("-");
      const date = new Date(year, month - 1, day);
      const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      });
      dat_arr.push(formattedDate);
    }
    setdat_arr(dat_arr);
    setintake_arr(intake_arr);
  };
  useEffect(() => {
    fetchUserData();
  }, [userData]);

  const data = [
    { value: useintake_arr[0], label: "Mon", date: usedat_arr[0] },
    { value: useintake_arr[1], label: "Tue", date: usedat_arr[1] },
    { value: useintake_arr[2], label: "Wed", date: usedat_arr[2] },
    { value: useintake_arr[3], label: "Thu", date: usedat_arr[3] },
    { value: useintake_arr[4], label: "Fri", date: usedat_arr[4] },
    { value: useintake_arr[5], label: "Sat", date: usedat_arr[5] },
    { value: useintake_arr[6], label: "Sun", date: usedat_arr[6] },
  ];

  const referenceLineValue = 2200;

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
        maxValue={Math.max(...data.map((item) => item.value)) + 650}
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
