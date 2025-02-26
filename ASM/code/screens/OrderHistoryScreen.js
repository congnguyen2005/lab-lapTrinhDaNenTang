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

  const updateOrderStatus = async (orderId) => {
    try {
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          let newStatus = order.status;
  
          if (order.status === "Đang xử lý") newStatus = "Đang giao";
          else if (order.status === "Đang giao") newStatus = "Đã giao";
          else if (order.status === "Đã giao") return order; // Nếu đã giao thì giữ nguyên
  
          return { ...order, status: newStatus };
        }
        return order;
      });
  
      setOrders(updatedOrders);
      await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
  
      // Kiểm tra trạng thái sau khi cập nhật
      console.log("Trạng thái mới:", updatedOrders);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
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
      case "Đang giao": return "blue";
      case "Đã giao": return "green";
      default: return "gray";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lịch sử mua hàng</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={fetchOrders}
        ListEmptyComponent={<Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Đơn hàng #{item.id}</Text>
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

              {/* Nút cập nhật trạng thái */}
              {item.status !== "Đã giao" && (
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => updateOrderStatus(item.id)}
                >
                  <Text style={styles.buttonText}>🔄 Cập nhật trạng thái</Text>
                </TouchableOpacity>
              )}
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
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default OrderHistoryScreen;
