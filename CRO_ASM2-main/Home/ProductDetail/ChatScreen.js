import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const SimpleChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() === "") return;

        const userMessage = { id: Date.now().toString(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        // Tạo phản hồi tự động
        setTimeout(() => {
            const botMessage = { id: (Date.now() + 1).toString(), text: "Cảm ơn bạn đã nhắn tin!", sender: "bot" };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.sender === "user" ? styles.userMessage : styles.botMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Nhập tin nhắn..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#f0f0f0" },
    message: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: "70%" },
    userMessage: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
    botMessage: { alignSelf: "flex-start", backgroundColor: "#ddd" },
    messageText: { color: "#fff" },
    inputContainer: { flexDirection: "row", padding: 10, backgroundColor: "#fff", alignItems: "center" },
    input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginRight: 10 },
    sendButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
    sendButtonText: { color: "#fff", fontWeight: "bold" }
});

export default SimpleChat;
