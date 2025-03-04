import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  const updateCart = async (updatedCart) => {
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    Alert.alert("Thanh toán thành công", "Cảm ơn bạn đã mua hàng!", [
      { text: "OK", onPress: async () => await AsyncStorage.removeItem("cart") },
    ]);
    setCart([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                      <Ionicons name="remove-circle-outline" size={24} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                      <Ionicons name="add-circle-outline" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Tổng tiền: ${getTotalPrice()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Thanh toán</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  emptyText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  cartItem: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "#666" },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  quantity: { marginHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  total: { fontSize: 20, fontWeight: "bold", textAlign: "right", marginVertical: 15 },
  checkoutButton: { backgroundColor: "#d32f2f", padding: 15, borderRadius: 10, alignItems: "center" },
  checkoutText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;
