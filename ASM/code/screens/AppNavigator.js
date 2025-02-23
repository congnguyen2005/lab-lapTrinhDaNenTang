//AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../HomeScreen";
import ProfileScreen from "./ProfileScreen";
import CartScreen from "./CartScreen";
import ProductDetailScreen from "./ProductDetailsScreen";
import CheckoutScreen from "./CheckoutScreen";
import OrderHistoryScreen from "./OrderHistoryScreen"; // ✅ Đảm bảo có import

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();   

// Stack cho Home
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{ title: "Chi Tiết Sản Phẩm" }} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh Toán" }} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Lịch Sử Đơn Hàng" }} />
  </Stack.Navigator>
);

// ✅ Stack cho Profile (Đảm bảo có OrderHistoryScreen)
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Tài Khoản" }} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Lịch Sử Đơn Hàng" }} />
  </Stack.Navigator>
);



// ✅ Bottom Tab Navigation
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "HomeTab") iconName = "home";
        else if (route.name === "CartTab") iconName = "shopping-cart";
        else if (route.name === "ProfileTab") iconName = "user";
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#ff4500",
      tabBarInactiveTintColor: "#666",
      tabBarStyle: { backgroundColor: "#fff", height: 60 },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: "Trang Chủ", headerShown: false }} />
    <Tab.Screen name="CartTab" component={CartScreen} options={{ title: "Giỏ Hàng" }} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: "Tài Khoản", headerShown: false }} />
  </Tab.Navigator>
);

// ✅ Navigation chính
export default function AppNavigator() {
  return (
    <Stack.Navigator>
     <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh Toán" }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Lịch Sử Đơn Hàng" }} /> {/* ✅ Thêm vào đây */}
    </Stack.Navigator>
  );
}
