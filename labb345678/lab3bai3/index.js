import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, Image } from 'react-native';
import { styles } from './styles'; // Import styles từ styles.js  

const Lab3 = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleBackPress = () => {
        Alert.alert(
            'Thông báo',
            'Bạn đã tắt modal bằng nút back của thiết bị',
            [{ text: 'OK', onPress: () => setModalVisible(false) }]
        );
    };

    return (
        <View style={styles.centeredView}>
            {/* Nút mở modal */}
            <Pressable style={styles.openButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Mở modal</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleBackPress} // Xử lý khi nhấn nút back  
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Chữ Hello World */}
                        <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                            Hello World!
                        </Text>

                        {/* Hiển thị ảnh */}
                        <Image
                            source={{ uri: 'https://images.viblo.asia/f1f7004c-cd83-4a78-8d99-27f0247e872a.png' }}
                            style={{ width: 200, height: 200, marginBottom: 20 }}
                            resizeMode="contain"
                        />

                        {/* Nút ẩn modal */}
                        <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Ẩn Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Lab3;