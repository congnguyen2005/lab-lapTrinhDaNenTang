// bai3.js
import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopTab = createMaterialTopTabNavigator();

function ForYouScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cho Bạn</Text>
    </View>
  );
}

function LiveScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trực Tiếp</Text>
    </View>
  );
}

function GameScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trò Chơi</Text>
    </View>
  );
}

export default function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon 
              name={route.name === 'CHO BẠN' ? 'person' : route.name === 'TRỰC TIẾP' ? 'live-tv' : 'sports-esports'} 
              size={20} 
              color={color} 
            />
            <Text style={{ color, marginLeft: 5 }}>{route.name}</Text>
          </View>
        ),
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: '#4A148C' },
        tabBarIndicatorStyle: { backgroundColor: '#FF4081' },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#BBB',
      })}
    >
      <TopTab.Screen name="CHO BẠN" component={ForYouScreen} />
      <TopTab.Screen name="TRỰC TIẾP" component={LiveScreen} />
      <TopTab.Screen name="TRÒ CHƠI" component={GameScreen} />
    </TopTab.Navigator>
  );
}
