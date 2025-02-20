import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./code/HomeScreen";
import ProductDetailsScreen from "./code/screens/ProductDetailsScreen";
import LoginScreen from "./code/login";
import RegisterScreen from "./code/register"; 
import ProfileScreen from "./code/screens/profileScreen"; 
import ForgotPasswordScreen from "./code/screens/ForgotPasswordScreen";
import { CartProvider } from "./code/context/CartContext"; // Đảm bảo đường dẫn đúng
import AppNavigator from "./code/screens/AppNavigator";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack điều hướng Home + Chi tiết sản phẩm
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Chi Tiết Sản Phẩm" }} />
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
const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

// // Stack chính của ứng dụng
// const App = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//       <Stack.Screen name="Home" component={MainTabs} />
//       <CartProvider>
//       <AppNavigator />
//     </CartProvider>
//     </Stack.Navigator>
//   </NavigationContainer>
// );


export default App;
