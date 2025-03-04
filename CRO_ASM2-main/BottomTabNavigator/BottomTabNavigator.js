import React, { useState, useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import HomeStackNavigator from './HomeStackNavigator';
import FavoritesScreen from './FavoritesScreen';
import CartScreen from './CartScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const [cartCount, setCartCount] = useState(0);
    const [favoritesCount, setFavoritesCount] = useState(0);

    // Hàm load dữ liệu giỏ hàng & yêu thích
    const loadCartAndFavorites = async () => {
        try {
            const cartData = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            const totalCartItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalCartItems);

            const favoritesData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavoritesCount(favoritesData.length);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    // Cập nhật khi tab được focus
    useFocusEffect(
        useCallback(() => {
            loadCartAndFavorites();
        }, [])
    );

    // Lắng nghe sự kiện cập nhật từ các màn hình khác
    useEffect(() => {
        const cartListener = DeviceEventEmitter.addListener('updateCart', loadCartAndFavorites);
        const favoritesListener = DeviceEventEmitter.addListener('updateFavorites', loadCartAndFavorites);

        return () => {
            cartListener.remove();
            favoritesListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#f0a500',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#fff', height: 60 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <MaterialCommunityIcons name="heart" color={color} size={size} />
                            {favoritesCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{favoritesCount}</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <MaterialCommunityIcons name="cart" color={color} size={size} />
                            {cartCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cartCount}</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// CSS cho badge thông báo
const styles = {
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
};
