import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const API_URL = 'https://example.com/api/products'; // Đổi thành link API của bạn

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(true);

  const categories = ['Tất cả', 'Áo', 'Quần', 'Giày', 'Phụ kiện'];

  // Gọi API để lấy dữ liệu sản phẩm
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false);
      });
  }, []);

  // Tìm kiếm sản phẩm
  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) &&
      (selectedCategory === 'Tất cả' || item.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  // Lọc sản phẩm theo danh mục
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    const filtered = category === 'Tất cả' ? products : products.filter(item => item.category === category);
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị vòng xoay khi tải dữ liệu */}
      {loading ? <ActivityIndicator size="large" color="blue" /> : (
        <>
          {/* Ô tìm kiếm */}
          <TextInput
            style={styles.searchBox}
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChangeText={handleSearch}
          />

          {/* Bộ lọc danh mục */}
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => filterByCategory(category)}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Danh sách sản phẩm */}
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} VND</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f8f8f8' },
  searchBox: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  categoryContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  categoryButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 5 },
  selectedCategory: { backgroundColor: '#007bff' },
  categoryText: { color: '#fff' },
  productCard: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  productImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productPrice: { color: 'green', fontSize: 14 },
});

export default HomeScreen;
