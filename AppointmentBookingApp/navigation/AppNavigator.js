  import React, { useState } from "react";
  import { createStackNavigator } from "@react-navigation/stack";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { NavigationContainer } from "@react-navigation/native";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons";

  // Import các màn hình
  import LoginScreen from "../Screens/auth/LoginScreen";
  import RegisterScreen from "../Screens/auth/RegisterScreen";

  import BookingScreen from "../Screens/Booking/BookingScreen";
  import BookingConfirmationScreen from "../Screens/Booking/BookingConfirmationScreen";

  import ChatListScreen from "../Screens/chat/ChatListScreen";
  import ChatScreen from "../Screens/chat/ChatScreen";

  import DoctorProfileScreen from "../Screens/Doctor/DoctorProfileScreen";

  import ProfileScreen from "../Screens/profile/ProfileScreen";
  import EditProfileScreen from "../Screens/profile/EditProfileScreen";
  import HomeScreen from "../Screens/Home/HomeScreen";

  import AppointmentsScreen from "../Screens/Booking/AppointmentBookingScreen";
  import SplashScreen from "../Screens/auth/SplashScreen";


  // Tạo Stack Navigators
  const AuthStack = createStackNavigator();
  const BookingStack = createStackNavigator();
  const ChatStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Stack Navigator cho màn hình đăng nhập
  const AuthNavigator = ({ setIsLoggedIn }) => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );

  // Stack Navigator cho màn hình Home
  const HomeNavigator = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
    </HomeStack.Navigator>
  );

  // Stack Navigator cho đặt lịch hẹn
  const BookingNavigator = () => (
    <BookingStack.Navigator>
          <BookingStack.Screen name="BookingScreen" component={BookingScreen} options={{ title: "Đặt lịch hẹn" }} />
      <BookingStack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} options={{ title: "Xác nhận lịch hẹn" }} />
      <BookingStack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: "Lịch hẹn của bạn" }} />
    </BookingStack.Navigator>
  );

  // Stack Navigator cho tin nhắn
  const ChatNavigator = () => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatList" component={ChatListScreen} options={{ title: "Tin nhắn" }} />
      <ChatStack.Screen name="Chat" component={ChatScreen} options={{ title: "Trò chuyện" }} />
    </ChatStack.Navigator>
  );

  // Stack Navigator cho hồ sơ cá nhân
  const ProfileNavigator = ({ setIsLoggedIn }) => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );


  // Bottom Tab Navigator
  const MainTabNavigator = ({ setIsLoggedIn }) => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
    name="HomeTab"  // Đổi tên thành HomeTab
    component={HomeNavigator}
    options={{
      title: "Trang chủ",
      tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
    }}
  />

      <Tab.Screen
        name="Lịch hẹn"
        component={BookingNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="calendar" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="chat" color={color} size={size} />,
        }}
      />
      <Tab.Screen  
        name="ProfileTab"
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color, size }) => <Icon name="account" color={color} size={size} />,
        }}
      >
        {() => <ProfileNavigator setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );


  // Điều hướng chính của ứng dụng
  const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
      <NavigationContainer>
        {isLoggedIn ? (
          <MainTabNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    );
  };


  export default AppNavigator;
    