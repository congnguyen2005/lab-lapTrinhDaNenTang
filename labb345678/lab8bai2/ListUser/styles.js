// screens/UserListScreen/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
}); 