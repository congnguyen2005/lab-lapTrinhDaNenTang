import React, { useState, useEffect, useCallback } from "react";
import { 
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useCart } from "../context/CartContext";
import CartBox from "../components/CartBox"; // ✅ Import hộp giỏ hàng

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params || {}; 
  const { cart, addToCart, updateCartQuantity } = useCart();  
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!product) {
      Alert.alert("Lỗi", "Không tìm thấy sản phẩm!");
      navigation.goBack();
    }
  }, [product, navigation]);

  const existingItem = cart.find((item) => item.id === product?.id);
  const isInCart = Boolean(existingItem);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = useCallback(() => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (isInCart) {
      updateCartQuantity(product.id, existingItem.quantity + quantity);
      Alert.alert("Thành công", `Cập nhật số lượng: ${existingItem.quantity + quantity}`);
    } else {
      addToCart({ ...product, quantity });
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
    }

    setTimeout(() => setIsProcessing(false), 500);
  }, [isProcessing, isInCart, quantity, product, addToCart, updateCartQuantity, existingItem]);

  const handleBuyNow = useCallback(() => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!isInCart) {
      addToCart({ ...product, quantity });
    } else {
      updateCartQuantity(product.id, existingItem.quantity + quantity);
    }

    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate("Cart");
    }, 500);
  }, [isProcessing, isInCart, quantity, product, addToCart, updateCartQuantity, existingItem, navigation]);

  if (!product) {
    return <ActivityIndicator size="large" color="blue" style={styles.loading} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Hộp giỏ hàng hiển thị trên cao */}
      <CartBox navigation={navigation} />  

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Icon name="remove" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Icon name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, isProcessing && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          <Icon name="add-shopping-cart" size={20} color="white" />
          <Text style={styles.buttonText}>
            {isInCart ? "Cập nhật giỏ hàng" : "Thêm vào giỏ hàng"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buyNowButton, isProcessing && styles.disabledButton]}
          onPress={handleBuyNow}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          <Icon name="shopping-cart" size={20} color="white" />
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginVertical: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 10,
  },
  buyNowButton: {
    backgroundColor: "#FF4500",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetailScreen;
