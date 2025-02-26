import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import moment from 'moment';

const CreateUserScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleCreateUser = async () => {
        if (!name.trim() || !date) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const formattedDate = moment(date).format('YYYY-MM-DD');

        try {
            await axios.post('http://172.16.48.141:5000/users',
                { name, date: formattedDate },
                { headers: { 'Content-Type': 'application/json' } }
            );

            Alert.alert('Thành công', 'Tạo tài khoản thành công');
            navigation.navigate('UserList'); // Quay lại danh sách user
        } catch (error) {
            console.log('Lỗi API:', error.response?.data || error.message);
            Alert.alert('Lỗi', error.response?.data?.message || 'Không thể tạo tài khoản');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    placeholder="Nhập tên"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <Text style={styles.label}>Ngày tạo</Text>
                <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <Icon name="calendar" size={18} color="#333" />
                    <Text style={styles.dateText}>
                        {date ? moment(date).format('DD/MM/YYYY') : 'Chọn ngày'}
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

                <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
                    <Icon name="check" size={18} color="white" />
                    <Text style={styles.createButtonText}>Tạo tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateUserScreen;
