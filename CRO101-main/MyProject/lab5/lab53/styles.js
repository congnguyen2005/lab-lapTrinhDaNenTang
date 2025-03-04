import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
    },
    header: {
        flex: 7,
        position: "relative",  
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    heartButton: {
        position: "absolute",
        top: "85%",
        right: 16,
        backgroundColor: "rgba(255, 255, 255,1)",
        padding: 8,
        borderRadius: 20,
        elevation: 5,
    },
    body: {
        flex: 3,
        padding: 16,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -25,
    },
    title: {
        position: "absolute",
        top: "80%",
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        left: 15,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    location: {
        color: "#1E88E5",
        marginLeft: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    rating: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        marginTop: 8,
        color: "#666",
    },
    footer: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#1E88E5",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    bookButton: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    bookText: {
        color: "#1E88E5",
        fontWeight: "bold",
    },
});
