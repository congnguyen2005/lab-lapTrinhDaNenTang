import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProductCard = ({ product }) => {
  const [price, setPrice] = useState(product.price);

  const increasePrice = () => {
    setPrice(prevPrice => prevPrice + 10); // Tăng $10 mỗi lần nhấn
  };

  return (
    <TouchableOpacity style={styles.card} onPress={increasePrice}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default ProductCard;
