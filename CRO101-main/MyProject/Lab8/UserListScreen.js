import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getUserList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.0.102:3000/users");
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserList();
    }, [])
  );

  const handleDelete = async (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.0.102:3000/users/${id}`);
            getUserList(); // Cập nhật lại danh sách sau khi xóa
          } catch (error) {
            console.error("Lỗi khi xóa:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate("UserDetail", { user: item })}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{item.birthdate}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={(e) => {
                    e.stopPropagation(); // Ngăn điều hướng khi bấm nút sửa
                    navigation.navigate("EditUserScreen", { user: item });
                  }}
                >
                  <Text style={styles.buttonText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={(e) => {
                    e.stopPropagation(); // Ngăn điều hướng khi bấm nút xóa
                    handleDelete(item.id);
                  }}
                >
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          
          
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddUser")}>
        <Text style={styles.addButtonText}>Thêm tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailButton: {
    backgroundColor: "#FFA500",
    padding: 8,
    borderRadius: 5,
  },
});


export default UserListScreen;
