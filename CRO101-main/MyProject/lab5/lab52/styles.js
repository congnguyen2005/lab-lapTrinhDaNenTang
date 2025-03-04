
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },
    details: {
        marginLeft: 80,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        paddingBottom: 20,
    },
    firstLine: {
        color: 'white',
        fontSize:50,
    },
    secondLine: {
        color: 'white', // Sửa lỗi màu
        fontSize:50,
    },
    button: {
        width:100,
        height:50,
        backgroundColor:'white',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center', // Thêm để căn giữa text trong button
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        // paddingBottom: 50,
    },
});
