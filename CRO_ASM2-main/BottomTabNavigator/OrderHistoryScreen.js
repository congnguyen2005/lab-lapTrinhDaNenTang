import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistoryScreen = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    loadOrderHistory();
  }, []);

  const loadOrderHistory = async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem("orderHistory")) || [];
      setOrderHistory(history);
    } catch (error) {
      console.error("Lỗi khi tải lịch sử đơn hàng:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn hủy đơn hàng này?", [
      { text: "Không" },
      {
        text: "Có",
        onPress: async () => {
          const updatedOrders = orderHistory.filter((order) => order.id !== orderId);
          setOrderHistory(updatedOrders);
          await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử đơn hàng</Text>

      {orderHistory.length === 0 ? (
        <Text style={styles.noOrderText}>Chưa có đơn hàng nào</Text>
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.date}>Ngày đặt: {item.date}</Text>
              {item.items.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                  <Image source={{ uri: product.image }} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.quantity}>Số lượng: {product.quantity}</Text>
                    <Text style={styles.price}>{(product.price * product.quantity).toLocaleString()} đ</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.total}>Tổng tiền: {item.total.toLocaleString()} đ</Text>
              <TouchableOpacity style={styles.cancelButton} onPress={() => deleteOrder(item.id)}>
                <Text style={styles.cancelText}>Hủy đơn</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  noOrderText: { fontSize: 16, textAlign: "center", marginTop: 20, color: "gray" },
  orderContainer: { padding: 15, marginBottom: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
  date: { fontSize: 14, color: "gray", marginBottom: 5 },
  productContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  image: { width: 60, height: 60, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  quantity: { fontSize: 14 },
  price: { fontSize: 16, fontWeight: "bold", color: "green" },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "right", marginTop: 10 },
  cancelButton: { marginTop: 10, padding: 10, backgroundColor: "red", borderRadius: 5, alignItems: "center" },
  cancelText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default OrderHistoryScreen;
