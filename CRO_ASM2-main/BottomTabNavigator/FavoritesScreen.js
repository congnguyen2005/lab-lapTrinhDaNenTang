import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);
    const navigation = useNavigation();

    const loadFavorites = async () => {
        try {
            const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            console.log("Favorites Loaded: ", storedFavorites);
            setFavorites(storedFavorites);
        } catch (error) {
            console.error('Error loading favorites', error);
        }
    };

    // Cập nhật danh sách mỗi khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [navigation])
    );

    const removeFavorite = async (id) => {
        try {
            const updatedFavorites = favorites.filter(item => item.id !== id);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error removing favorite', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách yêu thích</Text>
            {favorites.length === 0 ? (
                <Text style={styles.emptyText}>Không có sản phẩm yêu thích nào.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} VND</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                                <Text style={styles.removeText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#888' },
    item: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#f8f8f8', padding: 10, borderRadius: 10 },
    image: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { color: '#d32f2f' },
    removeText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
});
