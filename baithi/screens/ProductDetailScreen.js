import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    checkCart();
  }, []);

  const checkCart = async () => {
    const existingCart = await AsyncStorage.getItem("cart");
    if (existingCart) {
      const cart = JSON.parse(existingCart);
      const exists = cart.some((item) => item.id === product.id);
      setIsInCart(exists);
    }
  };

  const addToCart = async () => {
    const existingCart = await AsyncStorage.getItem("cart");
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    setIsInCart(true);
    Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
  };

  const buyNow = async () => {
    await AsyncStorage.setItem("cart", JSON.stringify([{ ...product, quantity: 1 }]));
    navigation.navigate("Checkout", { product });
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.addToCartButton, isInCart && styles.disabledButton]}
          onPress={addToCart}
          disabled={isInCart}
        >
          <Text style={styles.buttonText}>{isInCart ? "Đã có trong giỏ hàng" : "Thêm vào giỏ hàng"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  image: { width: 250, height: 250, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "#666", marginBottom: 15 },
  buttonContainer: { flexDirection: "row", width: "100%", justifyContent: "space-between" },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#ff9800",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ProductDetailScreen;
