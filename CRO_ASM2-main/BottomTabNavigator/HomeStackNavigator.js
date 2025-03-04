import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home/index';
import ProductDetail from '../Home/ProductDetail/ProductDetail';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
