import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import CartBox from "../components/CartBox"; // Import hộp giỏ hàng

const ProductListScreen = ({ navigation }) => {
  const products = [
    { id: 1, title: "Áo thun", price: 150, image: "https://via.placeholder.com/100" },
    { id: 2, title: "Quần jeans", price: 300, image: "https://via.placeholder.com/100" }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.product} 
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <CartBox navigation={navigation} /> {/* Thêm hộp giỏ hàng */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  product: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  image: { width: 100, height: 100, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { color: "green" }
});

export default ProductListScreen;
