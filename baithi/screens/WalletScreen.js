import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Alert
} from "react-native";
import {
  getWalletBalance, updateWalletBalance, getTransactionHistory, addTransaction
} from "./walletStorage";

const WalletScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    const walletBalance = await getWalletBalance();
    const transactionHistory = await getTransactionHistory();
    setBalance(walletBalance);
    setHistory(transactionHistory);
  };

  // Xử lý nạp tiền
  const handleTopUp = async () => {
    const amount = 50000; // Số tiền nạp (giả lập)
    const newBalance = balance + amount;
    await updateWalletBalance(newBalance);
    await addTransaction({
      type: "Nạp tiền",
      amount,
      date: new Date().toLocaleString(),
    });

    setBalance(newBalance);
    loadWalletData();
    Alert.alert("Thành công", `Bạn đã nạp ${amount} VNĐ vào ví.`);
  };

  // Xử lý thanh toán bằng ví
  const handlePayWithWallet = async (amount) => {
    if (balance < amount) {
      Alert.alert("Lỗi", "Số dư không đủ để thanh toán.");
      return;
    }

    const newBalance = balance - amount;
    await updateWalletBalance(newBalance);
    await addTransaction({
      type: "Thanh toán",
      amount: -amount,
      date: new Date().toLocaleString(),
    });

    setBalance(newBalance);
    loadWalletData();
    Alert.alert("Thành công", `Bạn đã thanh toán ${amount} VNĐ.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ví ảo</Text>
      <Text style={styles.balance}>Số dư: {balance.toLocaleString()} VNĐ</Text>

      <TouchableOpacity style={styles.button} onPress={handleTopUp}>
        <Text style={styles.buttonText}>Nạp 50,000 VNĐ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.payButton]} onPress={() => handlePayWithWallet(20000)}>
        <Text style={styles.buttonText}>Thanh toán 20,000 VNĐ</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Lịch sử giao dịch:</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.transactionItem, item.amount > 0 ? styles.income : styles.expense]}>
            <Text>{item.type}</Text>
            <Text>{item.amount.toLocaleString()} VNĐ</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  balance: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  payButton: { backgroundColor: "#FF5733" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  historyTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  transactionItem: { padding: 10, borderRadius: 8, marginBottom: 5 },
  income: { backgroundColor: "#DFFFD6" },
  expense: { backgroundColor: "#FFD6D6" },
  date: { fontSize: 12, color: "#666" },
});

export default WalletScreen;
