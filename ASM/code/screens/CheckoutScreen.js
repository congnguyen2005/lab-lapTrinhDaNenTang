import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const [address, setAddress] = useState("");

  const handleOrder = async () => {
    if (!address.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      address,
      status: "Đang xử lý",
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(await AsyncStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];

    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
    clearCart();

    Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt!");
    navigation.navigate("OrderHistory");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Tổng tiền: ${getTotalPrice()}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ giao hàng"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  total: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  button: { backgroundColor: "#FF4500", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CheckoutScreen;
