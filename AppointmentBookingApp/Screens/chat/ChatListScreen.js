import React, { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const conversations = [
  {
    id: "1",
    doctor: "Đặng Công Nguyên",
    lastMessage: "Hẹn gặp bạn vào thứ 2!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    online: true,
  },
  {
    id: "2",
    doctor: "Tư Vấn Viên",
    lastMessage: "Đừng quên uống thuốc nhé!",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    online: false,
  },
  {
    id: "3",
    doctor: "BS. Lê Văn Minh",
    lastMessage: "Bạn có cần hỗ trợ thêm không?",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    online: true,
  },
];

const ChatListScreen = ({ navigation }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.chatItem}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Chat", { doctorName: item.doctor })}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.online && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.doctor}>{item.doctor}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <LinearGradient colors={["#E0F7FA", "#fff"]} style={styles.container}>
      <Text style={styles.header}>Tin nhắn</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#00796B", marginBottom: 15 },
  list: { paddingBottom: 20 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: { width: 55, height: 55, borderRadius: 27, marginRight: 12 },
  onlineDot: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#fff",
  },
  textContainer: { flex: 1 },
  doctor: { fontSize: 18, fontWeight: "bold", color: "#333" },
  lastMessage: { fontSize: 14, color: "#777", marginTop: 3 },
});

export default ChatListScreen;
