import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../constants/icons"; // 使用默认导入

const TabIcon = ({ icon, name, focused, color }) => {
  const iconColor = focused ? "#6387A9" : "#A7BFD6";

  return (
    <View
      className="items-center justify-center gap-2 top-6
    "
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-8 w-8"
      />
      <Text
        className={`${
          focused ? "font-bold" : "font-light"
        } text-xs text-center w-20`}
        style={{ color: color }}
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
          tabBarActiveTintColor: "#6387A9",
          tabBarInactiveTintColor: "#A7BFD6",

          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#A7E5FF",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: true,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ), // 确保 icons.home 可用
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: true,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Add food"
                focused={focused}
              />
            ), // 确保 icons.home 可用
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="PROFILE"
                focused={focused}
              />
            ), // 确保 icons.home 可用
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
