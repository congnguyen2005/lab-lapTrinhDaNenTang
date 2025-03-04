import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function CartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useFocusEffect(
        useCallback(() => {
            loadCart();
        }, [])
    );

    const loadCart = async () => {
        try {
            const cartData = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            setCartItems(cartData);
            setTotalPrice(0);
        } catch (error) {
            console.error('Lỗi tải giỏ hàng:', error);
        }
    };

    const updateTotalPrice = (selectedIds) => {
        const total = cartItems
            .filter(item => selectedIds.includes(item.id))
            .reduce((sum, item) => sum + item.price * item.quantity, 0);

        setTotalPrice(total);
    };

    const toggleSelectItem = (id) => {
        setSelectedItems((prevSelected) => {
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id];

            updateTotalPrice(newSelected);
            return newSelected;
        });
    };

    const addNotification = async (message) => {
        try {
            const notifications = JSON.parse(await AsyncStorage.getItem('notifications')) || [];
            const newNotification = {
                id: Date.now().toString(),
                title: 'Giỏ hàng',
                message,
                time: new Date().toLocaleTimeString(),
            };
            const updatedNotifications = [newNotification, ...notifications];
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
            console.error('Lỗi khi cập nhật thông báo:', error);
        }
    };

    // Gọi `addNotification` khi có sản phẩm trong giỏ hàng
    const updateQuantity = async (id, action) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                let newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
                return null;
            }
            return item;
        }).filter(Boolean);

        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        updateTotalPrice(selectedItems);

        if (updatedCart.length > 0) {
            await addNotification('Bạn có sản phẩm trong giỏ hàng, hãy kiểm tra trước khi rời đi!');
        }
    };


    const removeSelectedItems = async () => {
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Bạn chưa chọn sản phẩm nào để xóa.");
            return;
        }

        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa các sản phẩm đã chọn khỏi giỏ hàng?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const newCart = cartItems.filter(item => !selectedItems.includes(item.id));
                            await AsyncStorage.setItem('cart', JSON.stringify(newCart));
                            setCartItems(newCart);
                            setSelectedItems([]);
                            setTotalPrice(0);
                        } catch (error) {
                            console.error("Lỗi khi xóa sản phẩm:", error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn sản phẩm trước khi thanh toán.");
            return;
        }

        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
        navigation.navigate('Checkout', { cartItems: selectedProducts, totalPrice });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                                    <Ionicons
                                        name={selectedItems.includes(item.id) ? "checkbox" : "square-outline"}
                                        size={24}
                                        color="green"
                                        style={styles.checkbox}
                                    />
                                </TouchableOpacity>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')} VND</Text>
                                </View>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                    <Text style={styles.totalPrice}>Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={removeSelectedItems}>
                            <Text style={styles.buttonText}>Xóa đã chọn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.buttonText}>Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    emptyText: { fontSize: 16, color: 'gray', textAlign: 'center', marginTop: 20 },
    cartItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
    checkbox: { marginRight: 10 },
    image: { width: 50, height: 50, marginRight: 10 },
    itemInfo: { flex: 1 },
    itemText: { fontSize: 16, fontWeight: 'bold' },
    itemPrice: { fontSize: 14, color: 'gray' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    quantityButton: { fontSize: 20, padding: 5, color: 'blue' },
    quantityText: { fontSize: 16, marginHorizontal: 10 },
    totalPrice: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 10, color: '#d32f2f' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }
});
