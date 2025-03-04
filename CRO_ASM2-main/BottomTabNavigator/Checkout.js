import React, { useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { cartItems = [], totalPrice = 0 } = route.params || {};

  // Lưu đơn hàng vào lịch sử
  const saveOrderHistory = async () => {
    try {
      const existingOrders = JSON.parse(await AsyncStorage.getItem("orderHistory")) || [];
      const newOrder = {
        id: Date.now(), // Tạo ID đơn hàng
        items: cartItems,
        total: totalPrice,
        date: new Date().toLocaleString(),
      };

      const updatedOrders = [newOrder, ...existingOrders];
      await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedOrders));

      // Xóa giỏ hàng sau khi đặt hàng
      await AsyncStorage.removeItem("cart");

      // Chuyển đến màn hình lịch sử đơn hàng
      navigation.navigate("OrderHistory");
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử đơn hàng:", error);
    }
  };

  // Xác nhận đặt hàng
  const confirmOrder = () => {
    Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt!", [
      { text: "OK", onPress: saveOrderHistory },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Xác nhận đơn hàng</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
              <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()} đ</Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} đ</Text>

      <TouchableOpacity style={styles.orderButton} onPress={confirmOrder}>
        <Text style={styles.buttonText}>Xác nhận đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  productContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  image: { width: 60, height: 60, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  quantity: { fontSize: 14 },
  price: { fontSize: 16, fontWeight: "bold", color: "green" },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "right", marginVertical: 10 },
  orderButton: { backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default CheckoutScreen;
