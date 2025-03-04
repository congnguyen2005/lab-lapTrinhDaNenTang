import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../Screen/HomeScreen';
import CartScreen from '../Screen/CartScreen';
import FavoritesScreen from '../Screen/FavoritesScreen';
import NotificationScreen from '../Screen/NotificationScreen';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6C22',
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-bag';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          }
          else if (route.name === 'Notifications') {
            iconName = 'bell';
          }
          return <FontAwesome name={iconName} size={18} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />

    </Tab.Navigator>
  );
}
