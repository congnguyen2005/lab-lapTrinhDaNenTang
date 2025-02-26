import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

const UserCreatedScreen = ({ route, navigation }) => {
    const { name, date } = route.params; // Nhận dữ liệu từ CreateUserScreen

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tài khoản đã được tạo!</Text>
            <Text style={styles.info}>Tên: {name}</Text>
            <Text style={styles.info}>Ngày tạo: {date}</Text>
            <Button title="Về màn hình chính" onPress={() => navigation.navigate('UserList')} />
        </View>
    );
};

export default UserCreatedScreen;
