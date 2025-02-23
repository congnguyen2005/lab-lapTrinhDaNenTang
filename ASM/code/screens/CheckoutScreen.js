import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, Image 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lấy giỏ hàng từ AsyncStorage
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) setCart(JSON.parse(cartData));

        // Lấy thông tin địa chỉ từ AsyncStorage
        const userData = await AsyncStorage.getItem("userAddress");
        if (userData) {
          const { name, phone, address } = JSON.parse(userData);
          setName(name);
          setPhone(phone);
          setAddress(address);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    loadData();
  }, []);

  const saveAddress = async () => {
    if (!name || !phone || !address) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      await AsyncStorage.setItem("userAddress", JSON.stringify({ name, phone, address }));
      Alert.alert("Thành công", "Địa chỉ đã được lưu.");
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ:", error);
    }
  };

  const updateQuantity = async (index, delta) => {
    const updatedCart = [...cart];
    if (!updatedCart[index]) return;

    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const confirmOrder = async () => {
    if (!name || !phone || !address) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }
    if (cart.length === 0) {
      Alert.alert("Giỏ hàng trống", "Vui lòng thêm sản phẩm vào giỏ hàng.");
      return;
    }
    try {
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        address: { name, phone, address },
        paymentMethod,
        date: new Date().toLocaleString(),
        status: "Đang xử lý", // Thêm trạng thái đơn hàng
      };
  
      // Lấy lịch sử đơn hàng hiện tại từ AsyncStorage
      const orderHistory = await AsyncStorage.getItem("orderHistory");
      const updatedHistory = orderHistory ? JSON.parse(orderHistory) : [];
  
      updatedHistory.push(newOrder);
      await AsyncStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
  
      // Xóa giỏ hàng sau khi đặt hàng
      await AsyncStorage.removeItem("cart");
  
      Alert.alert("Thành công", "Đặt hàng thành công!", [
        { text: "OK", onPress: () => navigation.navigate("OrderHistory") },
      ]);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
    }
  };
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Địa chỉ giao hàng</Text>
      <TextInput placeholder="Họ tên" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
      <TextInput placeholder="Địa chỉ" value={address} onChangeText={setAddress} style={styles.input} />

      <TouchableOpacity onPress={saveAddress} style={styles.button}>
        <Text style={styles.buttonText}>Lưu địa chỉ</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Giỏ hàng</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
      ) : (
        cart.map((item, index) => (
          <View key={index.toString()} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.quantity} x {item.price.toLocaleString()} VND</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(index, -1)} style={styles.quantityButton}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(index, 1)} style={styles.quantityButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Text style={styles.totalText}>Tổng tiền: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} VND</Text>

      <Text style={styles.title}>Phương thức thanh toán</Text>
      {['COD', 'Thẻ', 'Momo'].map((method) => (
        <TouchableOpacity key={method} onPress={() => setPaymentMethod(method)} style={[styles.paymentButton, paymentMethod === method && styles.selected]}>
          <Text style={styles.paymentText}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={confirmOrder} style={styles.confirmButton}>
        <Text style={styles.buttonText}>Xác nhận mua hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10, borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF', padding: 15, borderRadius: 10, marginBottom: 20,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  cartItem: {
    flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#f0f0f0",
    borderRadius: 10, marginBottom: 10,
  },
  productImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: "bold", fontSize: 16 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    backgroundColor: "#FFA500", padding: 10, borderRadius: 5, marginHorizontal: 5,
  },
  quantityText: { fontSize: 18, fontWeight: "bold" },
  totalText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  paymentButton: {
    padding: 10, borderRadius: 5, backgroundColor: "#ddd", marginVertical: 5, alignItems: "center",
  },
  selected: { backgroundColor: '#007BFF' },
  confirmButton: {
    backgroundColor: "#FF4500", padding: 15, borderRadius: 10, marginTop: 20,marginBottom:50,
  },
});

export default CheckoutScreen;
