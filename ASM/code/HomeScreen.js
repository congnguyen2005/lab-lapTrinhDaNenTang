import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, Image, 
  StyleSheet, ActivityIndicator, TextInput, ScrollView 
} from "react-native";

const API_URL = "https://fakestoreapi.com/products";
const CATEGORY_URL = "https://fakestoreapi.com/products/categories";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      });

    fetch(CATEGORY_URL)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />;
  }

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory ? item.category === selectedCategory : true)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Image source={require("../assets/anh.png")} style={styles.banner} />
  
          <TextInput
            style={styles.searchBar}
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChangeText={setSearch}
          />
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={[styles.category, selectedCategory === null && styles.selectedCategory]} 
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={styles.categoryText}>TẤT CẢ</Text>
            </TouchableOpacity>
  
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.category, selectedCategory === category && styles.selectedCategory]} 
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      }
      data={filteredProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
  
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    padding: 10,
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  category: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#0056b3",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    color: "green",
    fontSize: 14,
    marginTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
