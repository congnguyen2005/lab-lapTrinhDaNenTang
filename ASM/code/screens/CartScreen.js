import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cart, updateCartQuantity, removeFromCart, getTotalPrice } = useCart();

  // Lưu trạng thái giỏ hàng vào AsyncStorage khi có thay đổi
  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống!");
      return;
    }
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateCartQuantity(item.id, item.quantity - 1)}>
                <Icon name="remove-circle" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateCartQuantity(item.id, item.quantity + 1)}>
                <Icon name="add-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Icon name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>Tổng tiền: ${getTotalPrice()}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  title: {
    flex: 2,
    fontSize: 16,
  },
  price: {
    flex: 1,
    color: "green",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: "#FF4500",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
