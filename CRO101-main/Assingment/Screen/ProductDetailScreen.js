import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFavorites } from "./FavoritesContext"; // Import context
import { useCart } from "./CartContext"; // Import CartContext

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const { favorites, toggleFavorite } = useFavorites(); // ✅ Lấy hàm toggleFavorite từ context
  const { addToCart } = useCart(); // ✅ Lấy hàm addToCart từ CartContext
  const [selectedSize, setSelectedSize] = useState("S");

  // Kiểm tra sản phẩm đã yêu thích chưa
  const isFavorite = favorites.some((favItem) => favItem.id === item.id);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    const productToAdd = { ...item, size: selectedSize }; // Thêm kích cỡ sản phẩm
    addToCart(productToAdd); // Thêm sản phẩm vào giỏ hàng
    
    alert("Product added to cart!", "", [
      {
        text: "OK",
        onPress: () => {
          setTimeout(() => {
            navigation.navigate('Cart'); // Điều hướng đến màn hình Giỏ hàng
          }, 100);
        }
      }
    ]);
  };
  

  return (
    <View style={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image source={item.image} style={styles.image} />

      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={18} color="#fff" />
      </TouchableOpacity>

      {/* Nút yêu thích */}
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item)}>
        <Icon name="heart" size={20} color={isFavorite ? "red" : "white"} />
      </TouchableOpacity>

      {/* Chi tiết sản phẩm */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>{item.subTitle}</Text>

        {/* Đánh giá */}
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="gold" />
          <Text style={styles.ratingText}> 4.5 (6,879)</Text>
        </View>

        {/* Mô tả */}
        <Text style={styles.description}>{item.description}</Text>

        {/* Chọn Size */}
        <Text style={styles.sizeTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {['S', 'M', 'L'].map(size => (
            <TouchableOpacity 
              key={size} 
              style={[styles.sizeButton, selectedSize === size && styles.sizeButtonSelected]} 
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextSelected]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Giá và nút thêm vào giỏ hàng */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$ {item.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  image: { width: "100%", height: 300, resizeMode: "cover" },
  backButton: { position: "absolute", top: 40, left: 20, padding: 10, backgroundColor: "#333", borderRadius: 20 },
  favoriteButton: { position: "absolute", top: 40, right: 20, padding: 10, backgroundColor: "#333", borderRadius: 20 },
  detailsContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subTitle: { fontSize: 14, color: "#bbb" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  ratingText: { fontSize: 16, color: "#fff" },
  description: { fontSize: 16, color: "#aaa", marginVertical: 10 },
  sizeTitle: { fontSize: 18, color: "#fff", marginTop: 10 },
  sizeContainer: { flexDirection: "row", marginVertical: 10 },
  sizeButton: { borderWidth: 1, borderColor: "#555", padding: 10, borderRadius: 8, marginRight: 10 },
  sizeButtonSelected: { backgroundColor: "#FF6C22" },
  sizeText: { color: "#aaa", fontSize: 16 },
  sizeTextSelected: { color: "#fff" },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  price: { color: "#FF6C22", fontSize: 20, fontWeight: "bold" },
  addButton: { backgroundColor: "#FF6C22", padding: 15, borderRadius: 8 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProductDetailsScreen;
