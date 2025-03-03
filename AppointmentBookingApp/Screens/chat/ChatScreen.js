import React, { useState, useRef } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { sendMessageToAI } from "./aiService";
import { IconButton, Card, Avatar } from "react-native-paper";

const ChatScreen = ({ route }) => {
  const { doctorName } = route.params || { doctorName: "Bác sĩ" };
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const aiResponse = await sendMessageToAI(input);
      const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: "ai" };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.header}>Trò chuyện với {doctorName}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageWrapper, item.sender === "user" ? styles.userWrapper : styles.aiWrapper]}>
            {item.sender === "ai" && <Avatar.Icon size={40} icon="robot" style={styles.aiAvatar} />}
            <Card style={[styles.messageBubble, item.sender === "user" ? styles.userMessage : styles.aiMessage]}>
              <Card.Content>
                <Text style={[styles.messageText, item.sender === "user" ? styles.userText : styles.aiText]}>
                  {item.text}
                </Text>
              </Card.Content>
            </Card>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#888"
        />
        <IconButton icon="send" size={24} color="#007bff" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", paddingHorizontal: 15, paddingBottom: 10 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#007bff" },
  messageWrapper: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  userWrapper: { justifyContent: "flex-end", flexDirection: "row" },
  aiWrapper: { justifyContent: "flex-start", flexDirection: "row" },
  aiAvatar: { marginRight: 8, backgroundColor: "#007bff" },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userMessage: { backgroundColor: "#007bff" },
  aiMessage: { backgroundColor: "#e5e7eb" },
  messageText: { fontSize: 16 },
  userText: { color: "#fff" },
  aiText: { color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
