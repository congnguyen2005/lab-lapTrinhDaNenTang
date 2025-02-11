import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [registerType, setRegisterType] = useState("email"); // email hoặc phone
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidPassword = (password) => password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleRegister = async () => {
    if (registerType === "email" && !isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }
    if (registerType === "phone" && !isValidPhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại phải có 10 chữ số!");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái và số!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const userData = registerType === "email" ? { email, password } : { phone, password };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      Alert.alert("Thành công", "Đăng ký thành công!", [{ text: "OK", onPress: () => navigation.replace("Login") }]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu tài khoản, vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng Ký</Text>

      {/* Chọn phương thức đăng ký */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setRegisterType("email")} style={[styles.toggleButton, registerType === "email" && styles.activeButton]}>
          <Text style={registerType === "email" ? styles.activeText : styles.inactiveText}>Đăng ký bằng Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRegisterType("phone")} style={[styles.toggleButton, registerType === "phone" && styles.activeButton]}>
          <Text style={registerType === "phone" ? styles.activeText : styles.inactiveText}>Đăng ký bằng SĐT</Text>
        </TouchableOpacity>
      </View>

      {/* Trường nhập Email hoặc Số điện thoại */}
      {registerType === "email" ? (
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      ) : (
        <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      )}

      {/* Mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Mật khẩu" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Xác nhận mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Xác nhận mật khẩu" secureTextEntry={!showConfirmPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Nút đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Hoặc đăng ký bằng</Text>

      {/* Đăng ký bằng Google và Facebook */}
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

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  toggleContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  toggleButton: { padding: 10, borderRadius: 5, marginHorizontal: 5 },
  activeButton: { backgroundColor: "#ff6347" },
  activeText: { color: "white", fontWeight: "bold" },
  inactiveText: { color: "gray" },

  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: { flex: 1 },

  button: { backgroundColor: "#ff6347", padding: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  orText: { textAlign: "center", marginVertical: 15, fontSize: 16, color: "#666" },

  socialContainer: { flexDirection: "row", justifyContent: "center", gap: 10 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: 150,
    justifyContent: "center",
  },
  socialText: { color: "white", fontSize: 16, marginLeft: 10, fontWeight: "bold" },

  link: { color: "blue", textAlign: "center", marginTop: 10 }
});

export default RegisterScreen;
