import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Bước 1: Nhập email/SĐT, Bước 2: Đặt lại mật khẩu

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidPassword = (password) =>
    password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);

  // Kiểm tra thông tin đăng ký
  const handleCheckAccount = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (!userData) {
      Alert.alert("Lỗi", "Tài khoản không tồn tại!");
      return;
    }

    const user = JSON.parse(userData);
    if (user.email === input || user.phone === input) {
      setStep(2); // Cho phép đặt lại mật khẩu
    } else {
      Alert.alert("Lỗi", "Email hoặc số điện thoại không đúng!");
    }
  };

  // Cập nhật mật khẩu mới
  const handleResetPassword = async () => {
    if (!isValidPassword(newPassword)) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái và số!"
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      let user = JSON.parse(userData);
      user.password = newPassword; // Cập nhật mật khẩu mới
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Thành công", "Mật khẩu đã được đặt lại!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } else {
      Alert.alert("Lỗi", "Không thể cập nhật mật khẩu, vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quên Mật Khẩu</Text>

      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập Email hoặc Số điện thoại"
            keyboardType="email-address"
            autoCapitalize="none"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleCheckAccount}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  button: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { color: "blue", textAlign: "center", marginTop: 10 },
});

export default ForgotPasswordScreen;