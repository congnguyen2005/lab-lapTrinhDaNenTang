import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace("Login");
    }, 4000);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/banner.png")} // Đổi ảnh nền của bạn ở đây
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]} style={styles.overlay}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ImageBackground
            source={require("../../assets/banner.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>Ứng dụng đặt lịch khám bệnh</Text>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SplashScreen;
