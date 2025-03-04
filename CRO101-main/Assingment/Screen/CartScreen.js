import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

const sizes = ["S", "M", "L"];

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, updateQuantity, updateSize, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    );
  };

  const calculateTotalPrice = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => toggleSelectItem(item.id)} style={styles.checkbox}>
        <FontAwesome name={selectedItems.includes(item.id) ? "check-square" : "square-o"} size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => updateSize(item.id, size)}
              style={[styles.sizeButton, item.size === size && styles.selectedSize]}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("SettingScreen")}>
            <FontAwesome name="th-large" size={24} color="#ccc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity>
            <Image source={require("./assets/avatar.png")} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList data={cart} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
        <TouchableOpacity 
          style={styles.payButton} 
          onPress={() => {
            const selectedProducts = cart.filter(item => selectedItems.includes(item.id));
            if (selectedProducts.length > 0) {
              navigation.navigate("PaymentScreen", { selectedItems: selectedProducts, totalPrice: calculateTotalPrice() });
            } else {
              alert("Vui lòng chọn ít nhất một sản phẩm!");
            }
          }}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E0F11", paddingHorizontal: 20 },
  headerWrapper: { paddingTop: StatusBar.currentHeight || 0 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  menuButton: { width: 42, height: 42, justifyContent: "center", alignItems: "center", backgroundColor: "#1C1C1E", borderRadius: 12 },
  profileImage: { width: 42, height: 42, borderRadius: 21 },
  headerTitle: { flex: 1, textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "bold" },
  cartItem: { flexDirection: "row", backgroundColor: "#1C1C1E", padding: 15, borderRadius: 12, marginBottom: 10, alignItems: "center" },
  checkbox: { marginRight: 10 },
  image: { width: 60, height: 60, borderRadius: 10 },
  infoContainer: { flex: 1, marginLeft: 10 },
  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sizeContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  sizeButton: { backgroundColor: "#333", padding: 5, borderRadius: 5, marginRight: 5 },
  selectedSize: { backgroundColor: "#FF6C22" },
  sizeText: { color: "#fff", fontSize: 14 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  price: { color: "#FF6C22", fontSize: 16, fontWeight: "bold", marginRight: 10 },
  button: { backgroundColor: "#FF6C22", width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center", marginHorizontal: 5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  quantity: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  deleteButton: { backgroundColor: "#FF3B30", width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center", marginLeft: 10 },
  deleteButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  checkoutContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#1C1C1E", borderRadius: 12, marginTop: 20 },
  totalPrice: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  payButton: { backgroundColor: "#FF6C22", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});

export default CartScreen;
