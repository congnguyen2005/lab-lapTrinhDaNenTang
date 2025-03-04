import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import BottomTabNavigator from './Screen/BottomTabNavigator';
import SettingScreen from './Screen/SettingScreen';
import ChangePasswordScreen from './Screen/ChangePasswordScreen';
import ProductDetailScreen from './Screen/ProductDetailScreen';
import PaymentScreen from './Screen/PaymentScreen';
import { CartProvider } from "./Screen/CartContext";
import { FavoritesProvider } from "./Screen/FavoritesContext";
import NotificationScreen from './Screen/NotificationScreen';






const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
    <CartProvider>
<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
    </FavoritesProvider>

    
  );
}