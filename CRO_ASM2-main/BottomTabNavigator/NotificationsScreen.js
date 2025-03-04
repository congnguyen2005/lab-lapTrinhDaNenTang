import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadNotifications();
        }, [])
    );

    const loadNotifications = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem('notifications')) || [];
            setNotifications(data); // Không cần reverse() nữa
        } catch (error) {
            console.error('Lỗi khi tải thông báo:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const updatedNotifications = notifications.map((item) =>
                item.id === id ? { ...item, read: true } : item
            );
            setNotifications(updatedNotifications);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thông báo:', error);
        }
    };

    const clearNotifications = async () => {
        Alert.alert("Xóa tất cả", "Bạn có chắc muốn xóa tất cả thông báo?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: async () => {
                    await AsyncStorage.removeItem("notifications");
                    setNotifications([]);
                },
                style: "destructive",
            },
        ]);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadNotifications();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thông báo</Text>
                {notifications.length > 0 && (
                    <TouchableOpacity onPress={clearNotifications}>
                        <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                )}
            </View>

            {notifications.length === 0 ? (
                <Text style={styles.noNotifications}>Hiện chưa có thông báo nào</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.notificationItem, item.read && styles.readNotification]}
                            onPress={() => markAsRead(item.id)}
                        >
                            <Text style={styles.message}>{item.message}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    title: { fontSize: 22, fontWeight: "bold" },
    noNotifications: { textAlign: 'center', fontSize: 16, color: 'gray', marginTop: 20 },
    notificationItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#f9f9f9' },
    readNotification: { backgroundColor: '#e0e0e0' },
    message: { fontSize: 14, color: '#555', marginVertical: 5 },
    time: { fontSize: 12, color: 'gray', textAlign: 'right' },
});
