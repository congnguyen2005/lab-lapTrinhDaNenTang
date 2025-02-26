import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, Button } from 'react-native';
import axios from 'axios';

const UserDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await axios.get(`http://172.16.48.141:5000/users/${id}`);
                setUser(response.data);
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể lấy thông tin tài khoản');
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetail();
    }, [id]);

    // Xoá người dùng
    const deleteUser = async () => {
        try {
            await axios.delete(`http://172.16.48.141:5000/users/${id}`);
            Alert.alert('Thành công', 'Xoá người dùng thành công!');
            navigation.goBack(); // Quay về màn hình trước đó
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể xoá người dùng');
        }
    };

    if (loading) return <ActivityIndicator size="large" />;

    return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
            <Text>{user.date}</Text>

            <Button title="Xoá tài khoản" color="red" onPress={deleteUser} />
        </View>
    );
};

export default UserDetailScreen;
