import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../constants/icons"; // 使用默认导入

const TabIcon = ({ icon, name, focused }) => {
  const iconColor = focused ? "#6387A9" : "#A7BFD6";

  return (
    <View
      className="items-center justify-center gap-2 top-6
    "
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={iconColor}
        className="h-7 w-7"
      />
      <Text
        className={`${
          focused ? "font-bold" : "font-light"
        } text-xs text-center w-20`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, name }) => (
              <TabIcon icon={icons.home} name="Dashboard" focused={focused} />
            ), // 确保 icons.home 可用
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, name }) => (
              <TabIcon icon={icons.plus} name="Add food" focused={focused} />
            ), // 确保 icons.home 可用
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, name }) => (
              <TabIcon icon={icons.profile} name="PROFILE" focused={focused} />
            ), // 确保 icons.home 可用
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
