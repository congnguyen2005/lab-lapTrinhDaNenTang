import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ToastAndroid,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(product.rating);

  useEffect(() => {
    checkFavoriteStatus();
    loadUserRating();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some((item) => item.id === product.id));
    } catch (error) {
      console.error("Lỗi khi kiểm tra danh sách yêu thích:", error);
    }
  };

  const loadUserRating = async () => {
    try {
      const ratings = JSON.parse(await AsyncStorage.getItem("ratings")) || {};
      if (ratings[product.id]) {
        setUserRating(ratings[product.id]);
      }
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
    }
  };

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Thông báo", message);
    }
  };

  const addToCart = async () => {
    try {
      const cartData = JSON.parse(await AsyncStorage.getItem("cart")) || [];
      const existingProduct = cartData.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity = Math.min(existingProduct.quantity + quantity, 10);
      } else {
        cartData.push({ ...product, quantity });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cartData));
      showToast(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng`);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const buyNow = () => {
    navigation.navigate("Checkout", {
      cartItems: [{ ...product, quantity }],
      totalPrice: product.price * quantity,
    });
  };

  const toggleFavorite = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((item) => item.id !== product.id);
        showToast("Đã xóa khỏi yêu thích");
      } else {
        updatedFavorites = [...favorites, product];
        showToast("Đã thêm vào yêu thích");
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
    }
  };

  const rateProduct = async (rating) => {
    try {
      setUserRating(rating);
      const ratings = JSON.parse(await AsyncStorage.getItem("ratings")) || {};
      ratings[product.id] = rating;
      await AsyncStorage.setItem("ratings", JSON.stringify(ratings));
      showToast(`Bạn đã đánh giá ${rating} sao`);
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.header}>
        <Text style={styles.name}>{product.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={30} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => rateProduct(index + 1)}>
            <Ionicons name={index < userRating ? "star" : "star-outline"} size={25} color="orange" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setQuantity((prev) => Math.min(prev + 1, 10))}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addToCart} onPress={addToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyNow} onPress={buyNow}>
        <Text style={styles.buyNowText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  productImage: { width: "100%", height: 300, resizeMode: "contain", borderRadius: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 24, fontWeight: "bold", marginVertical: 10, flex: 1 },
  price: { fontSize: 18, color: "green", marginBottom: 10 },
  ratingContainer: { flexDirection: "row", marginBottom: 10 },
  addToCart: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginTop: 20 },
  buyNow: { backgroundColor: "#ff5722", padding: 12, borderRadius: 8, marginTop: 10 },
});

export default ProductDetail;
