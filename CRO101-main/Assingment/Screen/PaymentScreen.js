import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems, totalPrice } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { clearPaidItems } = useCart();
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: "momo", name: "MoMo" },
    { id: "VNPay", name: "VNPay" },
    { id: "cash", name: "Cash on Delivery" },
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (!selectedItems || selectedItems.length === 0) {
      Alert.alert("Lỗi", "Không có sản phẩm trong giỏ hàng");
      return;
    }

    setLoading(true);

    const newOrder = {
      date: new Date().toISOString(),
      items: selectedItems.map((item) => ({
        ...item,
        image: typeof item.image === "string" ? item.image : "", // Ép kiểu image thành chuỗi
      })),
      totalAmount: totalPrice,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const existingOrders = await AsyncStorage.getItem("orders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(newOrder);
      await AsyncStorage.setItem("orders", JSON.stringify(orders));

      clearPaidItems(selectedItems.map((item) => item.id));

      Alert.alert("Thanh toán thành công", "Đơn hàng của bạn đã được đặt!", [
        { text: "OK", onPress: () => navigation.navigate("HomeTabs") },
      ]);
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
      Alert.alert("Lỗi", "Thanh toán thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      <FlatList
        data={selectedItems || []}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => {
          console.log("Image source:", item.image); // Debug kiểm tra dữ liệu hình ảnh

          return item ? (
            <View style={styles.item}>
              <Image
                source={
                  typeof item.image === "string" && item.image.startsWith("http")
                    ? { uri: item.image }
                    : require("./assets/blackcofe.png") // Hình mặc định nếu lỗi
                }
                style={styles.image}
              />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  ${item.price} x {item.quantity}
                </Text>
              </View>
            </View>
          ) : null;
        }}
      />
      <Text style={styles.total}>Tổng cộng: ${totalPrice}</Text>

      <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === method.id && styles.selectedMethod,
          ]}
          onPress={() => setSelectedPaymentMethod(method.id)}
        >
          <Text style={styles.paymentText}>{method.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Thanh toán</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0E0F11" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#1C1C1E",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  name: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  price: { fontSize: 14, color: "#FF6C22" },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
  },
  paymentMethod: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedMethod: { backgroundColor: "#FF6C22" },
  paymentText: { fontSize: 16, color: "#fff" },
  payButton: {
    backgroundColor: "#FF6C22",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export default PaymentScreen;
