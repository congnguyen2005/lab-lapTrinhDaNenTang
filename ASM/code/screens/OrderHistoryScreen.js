import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const savedOrders = JSON.parse(await AsyncStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    };
    loadOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => Alert.alert("Chi tiết đơn hàng", `Trạng thái: ${item.status}\nTổng tiền: $${item.total}`)}
          >
            <Text style={styles.orderText}>Mã đơn: {item.id}</Text>
            <Text style={styles.orderText}>Tổng tiền: ${item.total}</Text>
            <Text style={styles.orderText}>Ngày đặt: {item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  orderItem: { padding: 15, borderBottomWidth: 1 },
  orderText: { fontSize: 16 },
});

export default OrderHistoryScreen;
