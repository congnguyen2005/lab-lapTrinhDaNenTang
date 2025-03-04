import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const EditUserScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [birthdate, setBirthdate] = useState(user.birthdate);
    const [address, setAddress] = useState(user.address || "");

    const handleUpdate = async () => {
        try {
            await axios.put(`http://192.168.0.102:3000/users/${user.id}`, {
                name,
                birthdate,
                address,
            });
            Alert.alert("Thành công", "Thông tin đã được cập nhật!");
            navigation.goBack();
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa tài khoản {user.name}</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tên người dùng"
            />
            <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={setBirthdate}
                placeholder="Ngày sinh"
            />
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Địa chỉ (nếu có)"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    button: {
        backgroundColor: "#FFA500",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default EditUserScreen;
