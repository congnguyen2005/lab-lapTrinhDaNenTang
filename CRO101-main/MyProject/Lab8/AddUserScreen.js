import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";

const AddUserScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleAddUser = async () => {
        if (!name || !birthdate) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post("http://192.168.0.102:3000/users", {
                name,
                birthdate,
                avatar,
            });

            if (response.status === 201) {
                Alert.alert("Thành công", "Tài khoản đã được thêm!");
                navigation.goBack(); // Quay về màn hình trước đó
            }
        } catch (error) {
            console.error("Lỗi khi thêm tài khoản:", error);
            Alert.alert("Lỗi", "Không thể thêm tài khoản.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo mới tài khoản</Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập tên"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Nhập ngày tháng năm sinh"
                value={birthdate}
                onChangeText={setBirthdate}
            />

            <TextInput
                style={styles.input}
                placeholder="Đường dẫn ảnh đại diện (nếu có)"
                value={avatar}
                onChangeText={setAvatar}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddUser}>
                <Text style={styles.buttonText}>Thêm tài khoản</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#FF9800",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF9800",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddUserScreen;
