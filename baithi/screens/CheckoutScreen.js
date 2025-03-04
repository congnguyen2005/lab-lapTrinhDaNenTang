import React, { useState, useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from "react-native";
import { getWalletBalance, updateWalletBalance, addTransaction } from "./walletStorage";

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadWalletBalance();
  }, []);

  const loadWalletBalance = async () => {
    const walletBalance = await getWalletBalance();
    setBalance(walletBalance);
  };

  const handlePayment = async () => {
    if (balance < product.price) {
      Alert.alert("Lỗi", "Số dư trong ví không đủ để thanh toán.");
      return;
    }
    setLoading(true);
    try {
      const newBalance = balance - product.price;
      await updateWalletBalance(newBalance);
      await addTransaction({
        type: "Thanh toán đơn hàng",
        amount: -product.price,
        date: new Date().toLocaleString(),
      });

      setBalance(newBalance);
      Alert.alert("Thành công", "Thanh toán thành công bằng ví ảo.", [
        { text: "OK", onPress: () => navigation.navigate("Home") }
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xử lý thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <Text style={styles.balance}>Số dư ví: {balance.toLocaleString()} VNĐ</Text>
      <View style={styles.productContainer}>
        <Image source={product.image} style={styles.image} />
        <View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payText}>Xác nhận & Thanh toán</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  balance: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  productContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "#666" },
  payButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 10, alignItems: "center" },
  payText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CheckoutScreen;