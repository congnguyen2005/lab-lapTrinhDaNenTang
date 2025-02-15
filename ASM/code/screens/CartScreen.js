import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCart } from "../content/CartContext"; // Đảm bảo đường dẫn đúng

const CartScreen = ({ navigation }) => {
  const { cart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>${item.price} x {item.quantity}</Text>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Checkout")}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};
