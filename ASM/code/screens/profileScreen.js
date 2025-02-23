import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  console.log("Navigation state:", navigation.getState()); // ✅ Xem state của navigation

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Lịch sử đơn hàng" onPress={() => navigation.push("OrderHistory")} />

      <Button title="Đăng xuất" color="red" onPress={() => navigation.replace("Login")} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

export default ProfileScreen;
