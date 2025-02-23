// app.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopTabs from "./lab7/bai3";
import { View, Text, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row", // Icon và chữ nằm trên cùng một hàng ngang
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, // Ẩn label mặc định
          tabBarStyle: {
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={TopTabs}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <Icon
                  name="home"
                  size={24}
                  color={props.accessibilityState.selected ? "#6200EE" : "gray"}
                />
                {props.accessibilityState.selected && (
                  <Text style={{ color: "#6200EE", marginLeft: 5 }}>Home</Text>
                )}
              </CustomTabBarButton>
            ),
          }}
        />
        <Tab.Screen
          name="Document"
          component={TopTabs}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <Icon
                  name="description"
                  size={24}
                  color={props.accessibilityState.selected ? "#6200EE" : "gray"}
                />
                {props.accessibilityState.selected && (
                  <Text style={{ color: "#6200EE", marginLeft: 5 }}>Document</Text>
                )}
              </CustomTabBarButton>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={TopTabs}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <Icon
                  name="chat"
                  size={24}
                  color={props.accessibilityState.selected ? "#6200EE" : "gray"}
                />
                {props.accessibilityState.selected && (
                  <Text style={{ color: "#6200EE", marginLeft: 5 }}>Chat</Text>
                )}
              </CustomTabBarButton>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
