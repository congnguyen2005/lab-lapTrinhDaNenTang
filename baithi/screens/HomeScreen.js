import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const itemWidth = (width - 50) / 2; // Chia 2 cột, trừ padding

const HomeScreen = ({ navigation }) => {
  const [cartCount, setCartCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const cart = await AsyncStorage.getItem("cart");
        if (cart) {
          setCartCount(JSON.parse(cart).length);
        }
      };
      loadCart();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>New Collection</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={28} color="black" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Fix lỗi key trùng
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
            style={{ width: itemWidth }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: "#f4f4f4" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20 },
  title: { fontSize: 26, fontWeight: "bold" },
  cartContainer: { position: "relative", padding: 5 },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: { color: "white", fontSize: 14, fontWeight: "bold" },
  row: { justifyContent: "space-between", marginBottom: 15 },
});

export default HomeScreen;
