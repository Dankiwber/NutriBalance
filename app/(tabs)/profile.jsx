import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import icons from "../../constants/icons";

const ProfileScreen = () => {
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
            <Text className="text-white text-2xl font-bold mt-4">John Doe</Text>
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
            <Text className="text-gray-500">Gender: Male</Text>
            <Text className="text-gray-500 mt-2">Age: 28</Text>
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
                Calories
              </Text>
              <Text className="text-blue-500 text-2xl font-bold mt-2">
                12,400
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
            onPress={() => router.push("/signin")}
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
