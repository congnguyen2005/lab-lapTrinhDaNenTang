import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useCart } from "../context/CartContext";

const CartBox = ({ navigation }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity 
  style={styles.cartContainer} 
  onPress={() => navigation.navigate("Cart")} // Điều hướng đến màn hình giỏ hàng
>
  <Icon name="shopping-cart" size={24} color="white" />
  {totalItems > 0 && (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{totalItems}</Text>
    </View>
  )}
</TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  cartContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 30,
    elevation: 5, // Đổ bóng trên Android
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CartBox;
    