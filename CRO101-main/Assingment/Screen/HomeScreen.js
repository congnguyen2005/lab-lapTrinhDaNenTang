import React, { useState, useRef } from "react";
import { Animated, Easing } from "react-native";

import { useCart } from "./CartContext";
import {
  View, Text, TextInput, FlatList, Image, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView, StatusBar
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const categories = ["All", "Coffe", "Milk", "Tea", "Espresso"];
const coffeeData = [
  { id: "1", name: "Milk Coffe", category: "Coffe", description: "With Steamed Milk", price: 4.20, image: require("./assets/milkcofe.png") },
  { id: "2", name: "Black Coffe", category: "Coffe", description: "With Foam", price: 4.20, image: require("./assets/blackcofe.png") },
  { id: "3", name: "Milk Tea", category: "Milk", description: "Medium Roasted", price: 4.20, image: require("./assets/milktea.png") },
  { id: "4", name: "fresh Milk", category: "Milk", description: "Medium Roasted", price: 4.20, image: require("./assets/milk.png") },
  { id: "5", name: "Peach Tea", category: "Tea", description: "Medium Roasted", price: 4.20, image: require("./assets/tea.png") },
  { id: "6", name: "Lemon Tea", category: "Tea", description: "Dark Roasted", price: 4.50, image: require("./assets/tea.png") },
  { id: "7", name: "Espresso", category: "Espresso", description: "Strong & Bold", price: 3.90, image: require("./assets/cafe.png") },
];

const HomeScreen = () => {
  const [flyingProduct, setFlyingProduct] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 500], // Từ giữa màn hình xuống dưới
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.1], // Thu nhỏ dần
  });

  // Hàm xử lý khi thêm sản phẩm
  const addToCartWithAnimation = (item) => {
    setFlyingProduct(item);
    animatedValue.setValue(0); // Reset animation

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000, // Tăng lên cho mượt hơn
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setFlyingProduct(null); // Ẩn sau khi bay xong
      addToCart(item);
    });
  };




  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const filteredData = coffeeData.filter(item => {
    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <FontAwesome name="th-large" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("./assets/avatar.png")} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerText}>Find the best coffee for you</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Find Your Coffee..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery} // Cập nhật từ khóa tìm kiếm
      />

      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductDetailsScreen", { item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={(event) => {
                  const { pageX, pageY } = event.nativeEvent; // Lấy vị trí sản phẩm
                  addToCartWithAnimation(item, { x: pageX, y: pageY });
                }}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      {flyingProduct && (
        <Animated.Image
          source={flyingProduct.image}
          style={{
            position: "absolute",
            width: 80, height: 80, // Kích thước ban đầu
            left: "50%", marginLeft: -40, // Căn giữa màn hình
            top: "40%", // Xuất phát từ giữa
            transform: [{ translateY }, { scale }],
          }}
        />
      )}

    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0E0F11", paddingHorizontal: 20 },
  headerWrapper: { paddingTop: StatusBar.currentHeight || 0 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  menuButton: { width: 42, height: 42, justifyContent: "center", alignItems: "center", backgroundColor: "#1C1C1E", borderRadius: 12 },
  profileImage: { width: 42, height: 42, borderRadius: 21 },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 8, marginTop: 5 },
  searchBar: { backgroundColor: "#1C1C1E", padding: 14, borderRadius: 12, color: "#fff", marginBottom: 12 },
  categoryWrapper: { marginBottom: 8 },
  categoryContainer: { flexDirection: "row", paddingBottom: 8 },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, backgroundColor: "#333" },
  categoryButtonActive: { backgroundColor: "#FF6C22" },
  categoryText: { color: "#aaa", fontSize: 14 },
  categoryTextActive: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#1C1C1E", padding: 12, borderRadius: 14, width: "48%", marginBottom: 12 },
  image: { width: "100%", height: 120, borderRadius: 12 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 6 },
  description: { color: "#aaa", fontSize: 12, marginTop: 2 },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  price: { color: "#FF6C22", fontSize: 16, fontWeight: "bold" },
  addButton: { backgroundColor: "#FF6C22", width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;