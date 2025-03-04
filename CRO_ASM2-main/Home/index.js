import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    View, Text, FlatList, Image, TouchableOpacity,
    ActivityIndicator, SafeAreaView, Dimensions, Animated
} from 'react-native';
import axios from 'axios';
import styles from './styles';
import SearchBar from './SearchBar';

const API_URL = 'http://192.168.1.13:5000';

const banners = [
    { id: 1, image: 'https://intphcm.com/data/upload/banner-thoi-trang-tuoi.jpg' },
    { id: 2, image: 'https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thoi-trang.jpg' },
    { id: 3, image: 'https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thiet-ke-thoi-trang-3-1.jpg' },
    { id: 4, image: 'https://intphcm.com/data/upload/tieu-de-banner-thoi-trang.jpg' },
    { id: 5, image: 'https://wcomvn.s3.ap-southeast-1.amazonaws.com/image/2018/07/02035047/6059cdb6116fd.jpg' },
];

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [bannerIndex, setBannerIndex] = useState(0);
    
    const bannerRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    let bannerInterval = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchCategories();
        fetchProducts();
        startBannerAutoScroll();

        return () => clearInterval(bannerInterval.current);
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        if (!query.trim()) return setFilteredProducts(products);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products]);

    const filterByCategory = useCallback((categoryId) => {
        if (selectedCategory === categoryId) {
            setFilteredProducts(products);
            setSelectedCategory(null);
        } else {
            const filtered = products.filter(product => product.categoryId === categoryId);
            setFilteredProducts(filtered);
            setSelectedCategory(categoryId);
        }
    }, [products, selectedCategory]);

    const startBannerAutoScroll = () => {
        bannerInterval.current = setInterval(() => {
            setBannerIndex((prevIndex) => {
                let nextIndex = (prevIndex + 1) % banners.length;
                bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 5000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <SearchBar placeholder="Tìm kiếm sản phẩm..." onChangeText={handleSearch} />
                        <FlatList
                            ref={bannerRef}
                            data={banners}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Animated.View style={[styles.bannerContainer, { opacity: fadeAnim }]}>  
                                    <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="contain" />
                                </Animated.View>
                            )}
                        />
                        <Text style={styles.sectionTitle}>Lọc Sản Phẩm</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoryList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.categoryItem, selectedCategory === item.id && styles.categoryItemSelected]}
                                    onPress={() => filterByCategory(item.id)}
                                >
                                    <Image source={{ uri: item.image }} style={styles.categoryImage} />
                                    <Text style={styles.categoryName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                    </>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={styles.priceSoldContainer}>
                            <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
                            <Text style={styles.productSold}>Đã bán: {Math.floor(Math.random() * 1000)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
