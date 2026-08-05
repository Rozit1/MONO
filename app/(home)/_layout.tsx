import { auth } from "@/services/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Stack, Tabs } from "expo-router";

export default function HomeLayout() {
  if (!auth.currentUser) {
    return <Redirect href="/" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#408782",
        tabBarInactiveTintColor: "#AAAAAA",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
