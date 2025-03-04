import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    bannerContainer: {
        width,
        alignItems: 'center',
        marginBottom: 10,
    },
    bannerImage: {
        width: width * 0.9,
        height: 200,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginVertical: 10,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5,
    },
    productRow: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    productItem: {
        width: width * 0.45,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 16,
        color: '#ff5733',
        fontWeight: 'bold',
    },
});
