import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const paymentMethods = [
    { id: "wallet", name: "Wallet", balance: "$100.50", icon: "wallet-outline" },
    { id: "google", name: "Google Pay", icon: "logo-google" },
    { id: "apple", name: "Apple Pay", icon: "logo-apple" },
    { id: "amazon", name: "Amazon Pay", icon: "logo-amazon" },
];

const PaymentScreen = () => {
    const [selectedMethod, setSelectedMethod] = useState("credit");

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment</Text>

            {/* Thẻ Credit Card */}
            <View style={[styles.creditCard, selectedMethod === "credit" && styles.selectedCard]}>
                <View style={styles.cardTop}>
                    <Ionicons name="card-outline" size={24} color="white" />
                    <Text style={styles.cardBrand}>VISA</Text>
                </View>
                <Text style={styles.cardNumber}>3897 8923 6745 4638</Text>
                <View style={styles.cardBottom}>
                    <Text style={styles.cardHolder}>Tran Van Phuc</Text>
                    <Text style={styles.expiry}>02/30</Text>
                </View>
            </View>

            {/* Danh sách phương thức thanh toán */}
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            selectedMethod === item.id && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedMethod(item.id)}
                    >
                        <Ionicons name={item.icon} size={24} color="white" />
                        <Text style={styles.optionText}>{item.name}</Text>
                        {item.balance && <Text style={styles.balance}>{item.balance}</Text>}
                    </TouchableOpacity>
                )}
            />

            {/* Tổng tiền + Nút thanh toán */}
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>$4.20</Text>

            <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay from {selectedMethod === "credit" ? "Credit Card" : paymentMethods.find(m => m.id === selectedMethod)?.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#181a20", padding: 20 },
    header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },

    creditCard: {
        backgroundColor: "#272b33",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    selectedCard: { borderColor: "#ff8c00", borderWidth: 2 },
    cardTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    cardBrand: { fontSize: 18, fontWeight: "bold", color: "white" },
    cardNumber: { fontSize: 18, fontWeight: "bold", color: "white", letterSpacing: 2 },
    cardBottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    cardHolder: { fontSize: 16, color: "white" },
    expiry: { fontSize: 16, color: "white" },

    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#272b33",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedOption: { borderColor: "#ff8c00", borderWidth: 2 },
    optionText: { color: "white", fontSize: 16, marginLeft: 10, flex: 1 },
    balance: { color: "#aaa", fontSize: 14 },

    priceLabel: { color: "#aaa", fontSize: 14, marginTop: 20 },
    price: { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 20 },

    payButton: {
        backgroundColor: "#ff8c00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    payButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default PaymentScreen;
