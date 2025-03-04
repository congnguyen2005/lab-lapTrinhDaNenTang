import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Tạo hiệu ứng che mờ
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '90%', // Giới hạn chiều rộng
        maxWidth: 400, // Không quá to trên máy tính bảng
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Làm nền tối cho form
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    changeAvatarText: {
        marginTop: 5,
        color: 'lightblue',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: '#222', // Nền tối hơn
        color: 'white',
        borderRadius: 5,
        marginBottom: 10,
    },
    datePickerButton: {
        width: '100%',
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerText: {
        color: '#fff',
        fontSize: 16,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    genderButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    genderText: {
        fontSize: 14,
        color: '#fff',
    },
    selectedGender: {
        color: 'orange',
        fontWeight: 'bold',
    },
    button: {
        width: '80%', // Điều chỉnh độ rộng
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        marginTop: 10,
        color: 'lightblue',
    },
});

export default styles;
