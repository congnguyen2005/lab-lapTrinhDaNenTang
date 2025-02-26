import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from './styles';
import moment from 'moment';

const EditUserScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [date, setDate] = useState(new Date(user.date));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const updateUser = async () => {
        if (!name.trim() || !date) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        try {
            await axios.put(`http://172.16.48.141:5000/users/${user.id}`, {
                name,
                date: moment(date).format('YYYY-MM-DD'),
            });
            Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể cập nhật.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Chỉnh sửa tài khoản</Text>

                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập tên"
                />

                <Text style={styles.label}>Ngày tạo</Text>
                <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <Icon name="calendar" size={18} color="#333" />
                    <Text style={styles.dateText}>
                        {moment(date).format('DD/MM/YYYY')}
                    </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(selectedDate) => {
                        setDate(selectedDate);
                        setDatePickerVisibility(false);
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                />

                <TouchableOpacity style={styles.updateButton} onPress={updateUser}>
                    <Icon name="check" size={18} color="white" />
                    <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditUserScreen;
