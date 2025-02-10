import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params; // Nhận dữ liệu sản phẩm

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>
        Đây là mô tả chi tiết của sản phẩm {product.name}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: "100%", height: 300, resizeMode: "cover", marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "green", marginBottom: 10 },
  description: { fontSize: 16, color: "#555" },
});

export default ProductDetailsScreen;
