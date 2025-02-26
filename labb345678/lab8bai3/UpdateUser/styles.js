import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    dateText: {
        marginLeft: 10,
        color: '#333',
    },
    updateButton: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
