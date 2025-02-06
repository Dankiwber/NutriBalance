import React, { useEffect, useRef } from "react";
import { Text, View, Animated, StyleSheet } from "react-native";

const ProgressBar = ({
  label,
  progress = 0,
  duration = 2000,
  color = "#3498db",
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.columnContainer}>
      <Text style={styles.label}>
        {label}: {progress}%
      </Text>

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["1%", "100%"],
              }),
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    marginLeft: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "95%",
    marginVertical: 8, // 适当的间距
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 5,
  },
  container: {
    width: "100%",
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
});

export default ProgressBar;
