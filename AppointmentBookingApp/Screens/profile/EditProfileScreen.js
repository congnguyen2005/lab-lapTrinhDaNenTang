import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPhone = await AsyncStorage.getItem("phone");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
    };
    loadProfile();
  }, []);

  const validateInput = () => {
    const nameRegex = /^[A-Za-zÀ-ỹ ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{9,11}$/;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    if (!nameRegex.test(name)) {
      Alert.alert("Lỗi", "Tên chỉ được chứa chữ cái và khoảng trắng!");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại chỉ chứa số và có từ 9-11 chữ số!");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInput()) return;

    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("phone", phone);

    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
    navigation.goBack();
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.header}>Chỉnh sửa hồ sơ</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={22} color="#FFD700" style={styles.icon} />
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tên" placeholderTextColor="#bbb" />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={22} color="#FFD700" style={styles.icon} />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" placeholderTextColor="#bbb" />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="call-outline" size={22} color="#FFD700" style={styles.icon} />
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Số điện thoại" keyboardType="phone-pad" placeholderTextColor="#bbb" />
      </View>

      <TouchableOpacity onPress={handleSave} activeOpacity={0.8} style={styles.buttonWrapper}>
        <LinearGradient colors={["#ff512f", "#dd2476"]} style={styles.button}>
          <Text style={styles.buttonText}>Lưu thay đổi</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 25,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 18,
    padding: 16,
    width: "90%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
  },
  buttonWrapper: {
    width: "90%",
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default EditProfileScreen;
