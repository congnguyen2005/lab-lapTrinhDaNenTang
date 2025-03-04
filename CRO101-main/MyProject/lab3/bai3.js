import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, Alert, BackHandler } from 'react-native';

export default function Bai3Screen() {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const backAction = () => {
            if (modalVisible) {
                Alert.alert("Thông báo", "Bạn đã tắt modal bằng nút back của thiết bị!", [
                    { text: "OK", onPress: () => setModalVisible(false) }
                ]);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [modalVisible]);

    return (
        <View style={styles.container}>
            <Button title="Mở modal" onPress={() => setModalVisible(true)} color="green" />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Thông báo", "Bạn đã tắt modal bằng nút back của thiết bị!");
                    setModalVisible(false);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.image} />
                        <Button title="Ẩn Modal" onPress={() => setModalVisible(false)} color="blue" />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});
