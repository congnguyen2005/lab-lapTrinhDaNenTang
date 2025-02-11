import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "react-native-vector-icons";
import HomeScreen from "./code/home";
import ProductDetailsScreen from "./code/screens/ProductDetailsScreen";
import LoginScreen from "./code/login";
import RegisterScreen from "./code/register";
import ProfileScreen from "./code/screens/profileScreen"; 
import CartScreen from "./code/screens/CartScreen";
import ForgotPasswordScreen from "./code/screens/ForgotPasswordScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack điều hướng Home + Chi tiết sản phẩm
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

  </Stack.Navigator>
);

// Tạo Bottom Tab Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Profile") iconName = "person";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray",
      headerShown: false, // Ẩn header mặc định của từng tab
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Profile" component={ProfileScreen} />

  </Tab.Navigator>
);

// Stack chính của ứng dụng
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
