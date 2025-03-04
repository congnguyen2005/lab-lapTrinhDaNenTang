import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFavorites } from "./FavoritesContext";
import Icon from "react-native-vector-icons/FontAwesome";

const FavoritesScreen = () => {
  const { favorites, toggleFavorite } = useFavorites(); // ✅ Sử dụng toggleFavorite thay vì addToFavorites

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.header}>Favorites</Text>

      {/* Danh sách sản phẩm yêu thích */}
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Ảnh sản phẩm */}
              <Image source={item.image} style={styles.image} />

              {/* Nội dung */}
              <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.subTitle}</Text>

                {/* Đánh giá */}
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="gold" />
                  <Text style={styles.ratingText}> 4.5 (6,879)</Text>
                </View>

                {/* Mô tả */}
                <Text style={styles.description} numberOfLines={3}>
                  {item.description}
                </Text>

                {/* Loại & Nút xoá */}
                <View style={styles.footer}>
                  <Text style={styles.category}>{item.category}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item)}> 
                    {/* Nếu sản phẩm đã được yêu thích, hiển thị trái tim đỏ, nếu chưa hiển thị trắng */}
                    <Icon name="heart" size={20} color={favorites.some(fav => fav.id === item.id) ? "red" : "white"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  emptyText: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    flexDirection: "row",
  },
  image: { width: 120, height: 120, borderRadius: 15 },
  content: { flex: 1, padding: 15 },
  name: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  subTitle: { fontSize: 14, color: "#bbb", marginBottom: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  ratingText: { fontSize: 16, color: "#fff", marginLeft: 5 },
  description: { fontSize: 14, color: "#aaa", marginVertical: 5 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  category: { fontSize: 14, color: "#FF6C22", fontWeight: "bold" },
});

export default FavoritesScreen;
