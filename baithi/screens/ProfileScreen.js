import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const email = await AsyncStorage.getItem("userEmail");
        if (name && email) {
          setUser({ name, email });
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: async () => {
          await AsyncStorage.removeItem("loggedIn");
          navigation.replace("Login"); // Quay lại màn hình đăng nhập
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      <View style={styles.profileCard}>
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{user.name || "Chưa cập nhật"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email || "Chưa cập nhật"}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  profileCard: { width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  label: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 10 },
  value: { fontSize: 16, color: "#555", marginBottom: 10 },
  logoutButton: { marginTop: 30, backgroundColor: "#E53935", padding: 15, borderRadius: 10, width: "100%", alignItems: "center" },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProfileScreen;
