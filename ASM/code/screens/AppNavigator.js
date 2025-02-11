import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack cho Home
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Chi Tiết Sản Phẩm" }} />
  </Stack.Navigator>
);

// Bottom Tab Navigation
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Cart") {
          iconName = "shopping-cart";
        } else if (route.name === "Profile") {
          iconName = "user";
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#ff4500",
      tabBarInactiveTintColor: "#666",
      tabBarStyle: { backgroundColor: "#fff", height: 60 },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} options={{ title: "Trang Chủ" }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Giỏ Hàng" }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Tài Khoản" }} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
