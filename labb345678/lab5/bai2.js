import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";


// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Ẩn thanh trạng thái để hiển thị toàn màn hình */}
      <StatusBar hidden />

      <ImageBackground
        source={require("../assets/background.png")} // Thay ảnh của bạn
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.title}>world with us</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
            sapien eu felis rhoncus faucibus.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  background: {
    width: width,  // Đảm bảo ảnh nền full chiều rộng
    height: height, // Đảm bảo ảnh nền full chiều cao
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Hiệu ứng làm mờ ảnh
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginVertical: 15,
    fontFamily: 'Shafarik-Regular'
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003580",
  },
});

export default OnboardingScreen;
