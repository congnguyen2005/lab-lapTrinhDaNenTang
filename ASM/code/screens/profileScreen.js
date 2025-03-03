import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: "Đặng Công Nguyên",
    email: "dangcongnguyenst@gmail.com",
    phone: "0987 654 321",
    address: "123 Đường ABC, TP. Hồ Chí Minh",
    avatar: "https://file.hstatic.net/1000253775/file/cua-hang-quan-nam-da-nang-davies_f2c0daad799c4347a523f81c510cf6e6.jpg",
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      
      {/* Thông tin cá nhân */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
      <Text style={styles.address}>{user.address}</Text>

      {/* Nút Chỉnh sửa hồ sơ */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>

      {/* Nút Lịch sử đơn hàng */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("orderHistory")}>
        <Text style={styles.buttonText}>Lịch sử đơn hàng</Text>
      </TouchableOpacity>

      {/* Nút Đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace("Login")}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f5",
    padding: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#3498db",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#2980b9",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
