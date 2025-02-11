import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    color: "green",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default ProductDetailScreen;
