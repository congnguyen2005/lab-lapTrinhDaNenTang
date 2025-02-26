// screens/EditUserScreen/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from './styles';

const EditUserScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const updateUser = () => {
        Alert.alert('Thành công', 'Cập nhật thông tin người dùng thành công!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa tài khoản {user.name}</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Button title="Cập nhật thông tin" color="orange" onPress={updateUser} />
        </View>
    );
};

export default EditUserScreen;  