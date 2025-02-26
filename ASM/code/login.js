import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    const savedEmail = await AsyncStorage.getItem("savedEmail");
    const savedPassword = await AsyncStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  };

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        setErrorMessage("Tài khoản chưa được đăng ký!");
        return;
      }

      const { email: savedEmail, password: savedPassword } = JSON.parse(storedUser);

      if (email !== savedEmail || password !== savedPassword) {
        setErrorMessage("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
        return;
      }

      setErrorMessage("");
      navigation.navigate("Main", { screen: "Home" });

    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      </View>

      <Text style={styles.header}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.rememberContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={styles.rememberText}>{rememberMe ? "✅ " : "⬜ "}Lưu mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#DB4437" }]}>
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#4267B2" }]}>
          <Ionicons name="logo-facebook" size={24} color="white" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f8f9fa" },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subHeader: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  passwordInput: { flex: 1 },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
  rememberContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  rememberText: { fontSize: 16 },
  forgotPassword: { color: "blue", fontSize: 16 },
  button: { backgroundColor: "#ff6347", padding: 15, borderRadius: 10, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 15, fontSize: 16, color: "#666" },
  socialContainer: { flexDirection: "row", justifyContent: "center", gap: 10 },
  socialButton: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 10, width: 150, justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  socialText: { color: "white", fontSize: 16, marginLeft: 10, fontWeight: "bold" },
  link: { color: "blue", textAlign: "center", marginTop: 15, fontSize: 16 }
});

export default LoginScreen;
