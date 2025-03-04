import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "nguyen@gmail.com" && password === "123456") {
      Alert.alert("Đăng nhập thành công!", "Chào mừng bạn.", [
        { text: "OK", onPress: () => navigation.replace("HomeTabs")        }
      ]);
    } else {
      Alert.alert("Lỗi", "Tài khoản hoặc mật khẩu không đúng.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { height: 50, borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#FF6C22", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
});

export default LoginScreen;
