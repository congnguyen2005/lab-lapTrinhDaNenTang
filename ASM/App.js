 //app.js
 import React from "react";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import HomeScreen from "./code/HomeScreen";
  import ProductDetailsScreen from "./code/screens/ProductDetailsScreen";
  import LoginScreen from "./code/login";
  import RegisterScreen from "./code/register";
  import ProfileScreen from "./code/screens/ProfileScreen";
  import ForgotPasswordScreen from "./code/screens/ForgotPasswordScreen";
  import { CartProvider } from "./code/context/CartContext"; // Đảm bảo đường dẫn đúng
  import CheckoutScreen from "./code/screens/CheckoutScreen"; // ✅ Thêm import
  import OrderHistoryScreen from "./code/screens/OrderHistoryScreen";

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Stack điều hướng Home + Chi tiết sản phẩm
  const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Chi Tiết Sản Phẩm" }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh Toán" }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Lịch Sử Đơn Hàng" }} /> 
    </Stack.Navigator>
  );
  // Tạo Bottom Tab Navigator
  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "Home" ? "home" : "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
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
          <Stack.Screen name="Main" component={MainTabs} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider> 
  );


  export default App;
