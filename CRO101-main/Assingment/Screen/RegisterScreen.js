import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (email && password) {
      Alert.alert("Đăng ký thành công!", "Hãy đăng nhập để tiếp tục.", [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
      ]);
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
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

export default RegisterScreen;
