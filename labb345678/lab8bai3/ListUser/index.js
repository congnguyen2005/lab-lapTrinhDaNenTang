import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const UserListScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://172.16.48.141:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://172.16.48.141:5000/users/${id}`);
            Alert.alert('Thành công', 'Xóa tài khoản thành công!');
            fetchUsers();
        } catch (error) {
            console.error('Lỗi khi xóa user:', error.response ? error.response.data : error.message);
        }
    };

    const filterUsersByDate = (date) => {
        setSelectedDate(date);
        fetchUsers();
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* Header + Chọn Ngày */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.createButton} 
                    onPress={() => navigation.navigate('CreateUser')}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.createButtonText}>Tạo tài khoản</Text>
                </TouchableOpacity>

                {/* Chọn Ngày */}
                <TouchableOpacity 
                    style={styles.datePicker} 
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <Icon name="calendar" size={18} color="#333" />
                    <Text style={styles.dateText}>
                        {selectedDate ? selectedDate.toISOString().split('T')[0] : "Chọn ngày"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Hiển thị DatePicker */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    filterUsersByDate(date);
                    setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />

            {/* Danh sách user */}
            <FlatList
                data={users}
                keyExtractor={(item) => item?.id?.toString() || `${Math.random()}`}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.date}>Ngày: {item.date}</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.editButton} 
                                onPress={() => navigation.navigate('EditUser', { user: item })}
                            >
                                <Icon name="pencil" size={16} color="white" />
                                <Text style={styles.buttonText}>Sửa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => {
                                    Alert.alert('Xác nhận', 'Bạn có chắc muốn xoá người dùng này?', [
                                        { text: 'Huỷ', style: 'cancel' },
                                        { text: 'Xoá', onPress: () => deleteUser(item.id) },
                                    ]);
                                }}
                            >
                                <Icon name="trash" size={16} color="white" />
                                <Text style={styles.buttonText}>Xoá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default UserListScreen;
