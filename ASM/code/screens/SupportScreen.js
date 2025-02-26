import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const handleLiveChat = () => {
  Alert.alert("Live Chat", "Chức năng này đang được phát triển.");
};

const handleSendEmail = () => {
  Linking.openURL("mailto:support@example.com").catch(err => Alert.alert("Lỗi", "Không thể mở ứng dụng Email"));
};

const handleCallHotline = () => {
  Linking.openURL("tel:+0982509443").catch(err => Alert.alert("Lỗi", "Không thể thực hiện cuộc gọi"));
};

const handleOpenFAQ = () => {
  Linking.openURL("https://160store.com/?srsltid=AfmBOoqje12154x0nYnn_BUBJ9EW2RouAEnrTvCFC2fDb5f69XcW0Aai").catch(err => Alert.alert("Lỗi", "Không thể mở trang FAQ"));
};

const supportOptions = [
  { id: "1", icon: "comments", text: "Live Chat", action: handleLiveChat },
  { id: "2", icon: "envelope", text: "Gửi Email", action: handleSendEmail },
  { id: "3", icon: "phone", text: "Gọi Hotline", action: handleCallHotline },
  { id: "4", icon: "question-circle", text: "FAQ", action: handleOpenFAQ },
];

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hỗ Trợ Khách Hàng</Text>
      <FlatList
        data={supportOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={item.action}>
            <FontAwesome name={item.icon} size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SupportScreen;
