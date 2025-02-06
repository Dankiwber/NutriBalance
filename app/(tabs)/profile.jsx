import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import icons from "../../constants/icons";
import { logoutUser } from "../api/auth";

const ProfileScreen = () => {
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userAge, setUserAge] = useState(null);
  const [userGoal, setUserGoal] = useState(null);
  const [userGender, setUserGender] = useState(undefined);

  const handleLogout = async () => {
    try {
      if (!userToken) {
        console.warn("User is already logged out.");
        return;
      }

      await logoutUser(userToken);

      // 清除 SecureStore 存储
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userName");
      await SecureStore.deleteItemAsync("userDate");
      await SecureStore.deleteItemAsync("userInfo");

      // 清空状态触发 UI 更新
      setUserToken("");
      setUserName("");
      setUserAge(null);
      setUserGoal(null);
      setUserGender(undefined);

      // 替换到登录界面，防止手势返回
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Error", "Something went wrong while logging out.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const info = await SecureStore.getItemAsync("userInfo");
        if (info) {
          const userInfo = JSON.parse(info);
          setUserGoal(userInfo["daily_goal"] || 0);
          setUserAge(userInfo["age"] || 0);
          setUserGender(userInfo["gender"] || "Unknown");
        }

        const token = await SecureStore.getItemAsync("userToken");
        const name = await SecureStore.getItemAsync("userName");

        if (token) setUserToken(token);
        if (name) setUserName(name);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userToken) {
    }
  }, [userToken]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Header */}
        <View className="bg-blue-500 p-6 rounded-b-3xl shadow-md">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Ionicons name="settings" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-6">
            <Image
              source={icons.default_av}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
            <Text className="text-white text-2xl font-bold mt-4">
              {userName || "Guest"}
            </Text>
            <Text className="text-blue-200">john.doe@example.com</Text>
          </View>
        </View>

        {/* Profile Details */}
        <View className="p-6">
          <View className="bg-white shadow-lg p-4 rounded-xl">
            <Text className="text-gray-600 text-lg font-semibold mb-2">
              Personal Information
            </Text>
            <View className="border-b border-gray-300 my-2" />
            <Text className="text-gray-500">Gender: {userGender}</Text>
            <Text className="text-gray-500 mt-2">Age: {userAge}</Text>
            <Text className="text-gray-500 mt-2">
              Location: Toronto, Canada
            </Text>
          </View>

          {/* Stats Section */}
          <View className="mt-6 flex-row justify-between">
            <View className="bg-white shadow-lg p-6 rounded-lg w-[48%] items-center">
              <Text className="text-gray-600 text-lg font-semibold">
                Workouts
              </Text>
              <Text className="text-blue-500 text-2xl font-bold mt-2">150</Text>
            </View>
            <View className="bg-white shadow-lg p-6 rounded-lg w-[48%] items-center">
              <Text className="text-gray-600 text-lg font-semibold">
                Daily Goal
              </Text>
              <Text className="text-blue-500 text-2xl font-bold mt-2">
                {userGoal || 0}
              </Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            onPress={() => router.push("/editProfile")}
            className="bg-blue-500 mt-8 p-4 rounded-lg items-center shadow-md"
          >
            <Text className="text-white text-lg font-semibold">
              Edit Profile
            </Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "OK", onPress: handleLogout },
                ]
              )
            }
            className="bg-red-500 mt-4 p-4 rounded-lg items-center shadow-md"
          >
            <Text className="text-white text-lg font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
