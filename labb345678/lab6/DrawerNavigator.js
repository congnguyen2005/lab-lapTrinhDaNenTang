import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../lab6/HomeScreen';
import DetailsScreen from '../lab6/DetailsScreen';
import ProfileScreen from '../lab6/ProfileScreen';

const Drawer = createDrawerNavigator();

// Header và Footer của drawer tùy chỉnh
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Hình nền */}
      <ImageBackground
        source={require('../assets/background.png')} // Thay thế bằng đường dẫn đến hình ảnh của bạn
        style={styles.backgroundImage}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/sep.png')} 
            style={styles.avatar}
          />
          <Text style={styles.headerName}>Đặng Công Nguyên</Text>
          <Text style={styles.headerEmail}>Nguyendcpd10143@gmail.com</Text>
        </View>
      </ImageBackground>

      {/* Danh sách menu */}
      <DrawerItemList {...props} />

      {/* Footer */}
      <Text style={styles.footerText}>Phiên bản ứng dụng: 2.6.0</Text>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 200, // Điều chỉnh chiều cao nếu cần
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFF",

  },
  headerEmail: {
    fontSize: 12,
    color: "#FFFF",
    marginBottom: 10,
  },
  footerText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 12,
    color: '#888',
  },
});
