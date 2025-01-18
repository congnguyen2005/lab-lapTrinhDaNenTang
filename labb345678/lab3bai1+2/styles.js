import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
    },
    baseText: {
        fontFamily: 'Cochin',
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    italicText: {
        fontStyle: 'italic',
    },
    tipStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 10,
    },
    // Thêm phong cách cho nút mở modal  
    openButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    // Thêm phong cách cho modal  
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ cho modal  
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    // Thêm phong cách cho nút trong modal  
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});