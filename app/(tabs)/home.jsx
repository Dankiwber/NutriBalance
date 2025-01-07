import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

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
    <View style={styles.container}>
      <Text style={styles.title}>Total cal Today:</Text>
      <Text style={styles.calories}>1867 Cal</Text>
      <BarChart
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#D6E4F0",
          backgroundGradientTo: "#D6E4F0",
          color: (opacity = 1) => `rgba(209, 122, 153, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
