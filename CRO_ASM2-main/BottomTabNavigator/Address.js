import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddressScreen() {
    const [addresses, setAddresses] = useState([
        { id: '1', name: 'Trần Văn Phúc', phone: '(+84) 376 953 693', address: 'Số 111, Hồ Quý Ly, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng', isDefault: true },
        { id: '2', name: 'Trần Văn Phúc', phone: '(+84) 376 953 693', address: 'Dốc Động, Thôn Hà Thanh, Xã Đại Đồng, Huyện Đại Lộc, Quảng Nam', isDefault: false },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '' });

    const handleAddAddress = () => {
        if (!newAddress.name || !newAddress.phone || !newAddress.address) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        setAddresses([...addresses, { ...newAddress, id: Date.now().toString(), isDefault: false }]);
        setModalVisible(false);
        setNewAddress({ name: '', phone: '', address: '' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Địa chỉ của Tôi</Text>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.addressContainer}>
                        <Text style={styles.name}>{item.name} <Text style={styles.phone}>{item.phone}</Text></Text>
                        <Text style={styles.address}>{item.address}</Text>
                        {item.isDefault && <Text style={styles.defaultLabel}>Mặc định</Text>}
                    </View>
                )}
            />

            {/* Nút Thêm Địa Chỉ Mới */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={24} color="#E07A5F" />
                <Text style={styles.addButtonText}>Thêm Địa Chỉ Mới</Text>
            </TouchableOpacity>

            {/* Modal nhập địa chỉ */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thêm Địa Chỉ Mới</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Họ và tên"
                            value={newAddress.name}
                            onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Số điện thoại"
                            keyboardType="phone-pad"
                            value={newAddress.phone}
                            onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
                        />
                        <TextInput
                            style={[styles.input, { height: 60 }]}
                            placeholder="Địa chỉ nhận hàng"
                            multiline
                            value={newAddress.address}
                            onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleAddAddress}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    addressContainer: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 10, marginBottom: 10 },
    name: { fontSize: 16, fontWeight: 'bold' },
    phone: { fontSize: 14, color: 'gray' },
    address: { fontSize: 14, color: '#555', marginTop: 5 },
    defaultLabel: { marginTop: 5, color: '#E07A5F', fontWeight: 'bold' },

    addButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    addButtonText: { fontSize: 16, color: '#E07A5F', marginLeft: 5 },

    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    cancelButton: { flex: 1, backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginRight: 10, alignItems: 'center' },
    saveButton: { flex: 1, backgroundColor: '#E07A5F', padding: 10, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' },
});
