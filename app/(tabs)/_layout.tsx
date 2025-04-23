// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function TabLayoutWrapper() {
  return (
    <ThemeProvider>
      <TabLayout />
    </ThemeProvider>
  );
}

function TabLayout() {
  const { isDarkMode, colors } = useTheme();

  return (
    <Tabs
      key={isDarkMode ? "dark" : "light"} // Forces rerender on toggle
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.card,
        },
        tabBarActiveTintColor: isDarkMode ? "#007bff" : "#007bff",
        tabBarInactiveTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="analysis/index"
        options={{
          title: "Analysis",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="linechart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
