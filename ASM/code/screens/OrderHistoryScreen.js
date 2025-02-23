import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const orderData = await AsyncStorage.getItem("orderHistory");
      if (orderData) setOrders(JSON.parse(orderData));
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const deleteAllOrders = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa toàn bộ lịch sử đơn hàng?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("orderHistory");
            setOrders([]);
          },
        },
      ]
    );
  };

  const deleteOrder = async (orderId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa đơn hàng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            const newOrders = orders.filter((order) => order.id !== orderId);
            setOrders(newOrders);
            await AsyncStorage.setItem("orderHistory", JSON.stringify(newOrders));
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang xử lý": return "orange";
      case "Đã giao": return "green";
      case "Đã hủy": return "red";
      default: return "gray";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lịch sử mua hàng</Text>

      {/* Nút xóa toàn bộ lịch sử */}
      {orders.length > 0 && (
        <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAllOrders}>
          <Text style={styles.deleteAllText}>🗑️ Xóa toàn bộ lịch sử</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={fetchOrders}
        ListEmptyComponent={<Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>}
        renderItem={({ item }) => {
          const firstProduct = item.items.length > 0 ? item.items[0].name : "Chưa có sản phẩm";
          return (
            <View style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Đơn hàng #{item.id} - {firstProduct}</Text>
                <TouchableOpacity onPress={() => deleteOrder(item.id)}>
                  <Text style={styles.deleteText}>🗑️</Text>
                </TouchableOpacity>
              </View>
              <Text>📅 Ngày đặt: {item.date}</Text>
              <Text>💰 Tổng tiền: {item.total.toLocaleString()} VND</Text>
              <Text>💳 Phương thức: {item.paymentMethod}</Text>
              <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                🏷️ Trạng thái: {item.status}
              </Text>

              <FlatList
                data={item.items}
                keyExtractor={(product, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.productItem}>
                    <Text>🔹 {item.name} x {item.quantity}</Text>
                    <Text>{(item.price * item.quantity).toLocaleString()} VND</Text>
                  </View>
                )}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.buttonText}>🛍️ Mua thêm</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  deleteAllButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteAllText: { color: "white", fontWeight: "bold" },
  emptyText: { fontSize: 16, textAlign: "center", marginTop: 20, color: "gray" },
  orderItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  orderTitle: { fontWeight: "bold", fontSize: 18 },
  deleteText: { color: "red", fontSize: 18 },
  status: { fontWeight: "bold", marginTop: 5 },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default OrderHistoryScreen;
