import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
    card: { backgroundColor: 'white', padding: 10, marginVertical: 5, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    name: { fontWeight: 'bold' },
    date: { color: 'gray', fontSize: 12, textAlign: 'right' },
});

export default styles;  