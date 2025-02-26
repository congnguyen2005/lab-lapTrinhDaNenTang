import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);

    // Hàm gọi API lấy danh sách user từ JSONPlaceholder
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});

export default UserListScreen;