import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    createButton: {
        flexDirection: 'row',
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 8,
    },
    dateText: {
        marginLeft: 5,
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
    },
});
