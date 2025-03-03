import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      const savedRememberMe = await AsyncStorage.getItem("rememberMe");
      
      if (savedRememberMe === "true" && savedEmail && savedPassword) {
        setCredentials({ email: savedEmail, password: savedPassword });
        setRememberMe(true);
      }
    };
    checkLogin();
  }, []);

  const handleChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = async () => {
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      return Alert.alert("Lỗi", "Email không hợp lệ.");
    }
    if (credentials.password.length < 6) {
      return Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự.");
    }

    const savedEmail = await AsyncStorage.getItem("email");
    const savedPassword = await AsyncStorage.getItem("password");

    if (credentials.email === savedEmail && credentials.password === savedPassword) {
      await AsyncStorage.setItem("isLoggedIn", "true");
      if (rememberMe) {
        await AsyncStorage.setItem("rememberMe", "true");
      } else {
        await AsyncStorage.removeItem("rememberMe");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }
      setIsLoggedIn(true);
      navigation.navigate("HomeTab");  // Đúng với tên đã đăng ký

    } else {
      Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logofpt.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={credentials.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberMeContainer}>
        <Checkbox
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text style={styles.rememberMeText}>Ghi nhớ đăng nhập</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20, backgroundColor: "#f4f4f4" },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#333", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  icon: { marginRight: 10 },
  button: { backgroundColor: "#ff9800", padding: 15, borderRadius: 25, width: "100%", alignItems: "center", marginBottom: 15 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  link: { marginTop: 10, color: "#555", fontSize: 16, textDecorationLine: "underline" },
  rememberMeContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  rememberMeText: { fontSize: 16, color: "#555", marginLeft: 8 },
});

export default LoginScreen;
