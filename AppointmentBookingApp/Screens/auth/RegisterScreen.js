import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) =>
    password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ.");
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại phải có 10 chữ số.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ và số.");
      return;
    }

    // Lưu thông tin vào AsyncStorage
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      Alert.alert("Thành công", "Đăng ký thành công! Chuyển đến đăng nhập.");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Lỗi", "Đăng ký thất bại, thử lại sau.");
    }
  };

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image source={require("../../assets/logofpt.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Đăng ký</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#555" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Họ và tên" value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color="#555" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#555" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  icon: { marginRight: 10 },
  button: { backgroundColor: "#ff9800", padding: 15, borderRadius: 25, width: "100%", alignItems: "center", marginBottom: 15 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  link: { marginTop: 10, color: "#ffffff", fontSize: 16, textDecorationLine: "underline" },
});

export default RegisterScreen;
