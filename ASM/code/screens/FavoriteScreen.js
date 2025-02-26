import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, Animated 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const FavoriteScreen = ({ navigation }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favoriteData = await AsyncStorage.getItem("favoriteProducts");
      setFavoriteProducts(favoriteData ? JSON.parse(favoriteData) : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      // Cập nhật lại danh sách yêu thích sau khi xóa sản phẩm
      const updatedFavorites = favoriteProducts.filter((item) => item.id !== id);
      await AsyncStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
      setFavoriteProducts(updatedFavorites);
      Alert.alert("Thông báo", "Đã xóa khỏi danh sách yêu thích!");
    } catch (error) {
      console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
    }
  };

  const renderItem = ({ item }) => {
    const fadeAnim = new Animated.Value(1); // Tạo một giá trị animated riêng biệt cho mỗi item

    const handleRemoveFavorite = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        removeFavorite(item.id); // Xóa sản phẩm sau khi hiệu ứng mờ hoàn tất
      });
    };

    return (
      <Animated.View style={[styles.productContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity onPress={handleRemoveFavorite} style={styles.deleteButton}>
          <Icon name="delete" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ Danh sách yêu thích</Text>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.emptyText}>Bạn chưa có sản phẩm yêu thích nào.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF5EE",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FF4500",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#008000",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    padding: 8,
    borderRadius: 8,
  },
});

export default FavoriteScreen;
