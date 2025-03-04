import AsyncStorage from "@react-native-async-storage/async-storage";

const WALLET_BALANCE_KEY = "wallet_balance";
const TRANSACTION_HISTORY_KEY = "transaction_history";

// Lấy số dư ví
export const getWalletBalance = async () => {
  const balance = await AsyncStorage.getItem(WALLET_BALANCE_KEY);
  return balance ? parseFloat(balance) : 0;
};

// Cập nhật số dư ví
export const updateWalletBalance = async (amount) => {
  await AsyncStorage.setItem(WALLET_BALANCE_KEY, amount.toString());
};

// Lấy lịch sử giao dịch
export const getTransactionHistory = async () => {
  const history = await AsyncStorage.getItem(TRANSACTION_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

// Thêm giao dịch mới
export const addTransaction = async (transaction) => {
  const history = await getTransactionHistory();
  history.unshift(transaction); // Thêm vào đầu danh sách
  await AsyncStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(history));
};
