import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const [name, setName] = useState("Chưa cập nhật");
  const [email, setEmail] = useState("Chưa cập nhật");
  const [phone, setPhone] = useState("Chưa cập nhật");

  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPhone = await AsyncStorage.getItem("phone");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
    };

    const focusListener = navigation.addListener("focus", loadProfile);

    return () => focusListener();
  }, [navigation]);

  const handleLogout = async () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          onPress: async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]} style={styles.container}>
      <Text style={styles.header}>Hồ sơ cá nhân</Text>
      <Image source={{ uri: "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-girl-doctor-avatar-logo-png-image_6848833.png" }} style={styles.avatar} />

      <Text style={styles.infoText}>Tên: {name}</Text>
      <Text style={styles.infoText}>Email: {email}</Text>
      <Text style={styles.infoText}>Số điện thoại: {phone}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfileScreen")}>
        <LinearGradient colors={["#ff512f", "#dd2476"]} style={styles.gradientButton}>
          <Text style={styles.buttonText}>Chỉnh sửa</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <LinearGradient colors={["#ff512f", "#ff0000"]} style={styles.gradientButton}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => navigation.navigate("HomeTab")}>
        <LinearGradient colors={["#34C759", "#2ECC71"]} style={styles.gradientButton}>
          <Text style={styles.buttonText}>Quay lại trang chủ</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#FFD700", textShadowColor: "rgba(0, 0, 0, 0.5)", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 },
  avatar: { width: 130, height: 130, borderRadius: 65, marginBottom: 20, borderWidth: 3, borderColor: "#FFD700" },
  infoText: { fontSize: 18, marginBottom: 8, color: "#fff", textAlign: "center" },
  button: { width: "90%", marginTop: 15, borderRadius: 20, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 5 },
  gradientButton: { padding: 14, width: "100%", borderRadius: 20, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold", textTransform: "uppercase" },
  logoutButton: { },
  homeButton: { },
});

export default ProfileScreen;
