import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 📌 Mẫu dữ liệu giả lập nếu chưa có lịch hẹn
const sampleAppointments = [
  { id: "1001", doctor: "BS. Hoàng Minh Tâm", date: "10/03/2024", time: "08:00 AM" },
  { id: "1002", doctor: "BS. Trần Thu Hà", date: "12/03/2024", time: "09:30 AM" },
  { id: "1006", doctor: "BS. Vũ Thị Lan", date: "22/03/2024", time: "18:00 PM" }
];

const AppointmentBookingScreen = () => {
  const route = useRoute();
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem("appointments");
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        } else {
          setAppointments(sampleAppointments);
          await AsyncStorage.setItem("appointments", JSON.stringify(sampleAppointments));
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch hẹn:", error);
      }
    };
    loadAppointments();
  }, []);

  useEffect(() => {
    if (route.params?.newAppointment) {
      setAppointments((prevAppointments) => {
        const isExist = prevAppointments.some(app => app.id === route.params.newAppointment.id);
        if (!isExist) {
          const updatedAppointments = [...prevAppointments, route.params.newAppointment];

          AsyncStorage.setItem("appointments", JSON.stringify(updatedAppointments))
            .catch(error => console.error("Lỗi khi lưu lịch hẹn:", error));

          return updatedAppointments;
        }
        return prevAppointments;
      });
    }
  }, [route.params?.newAppointment]);

  const handleDelete = async (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn hủy lịch hẹn này?", [
      { text: "Không" },
      { text: "Có", onPress: async () => {
        const updatedAppointments = appointments.filter((app) => app.id !== id);
        setAppointments(updatedAppointments);
        await AsyncStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        Alert.alert("Thông báo", "Lịch hẹn đã được hủy!");
      }},
    ]);
  };

  const startEditing = (appointment) => {
    setEditingAppointment(appointment);
    setEditedDate(appointment.date);
    setEditedTime(appointment.time);
  };

  const handleSaveEdit = async () => {
    if (!editedDate || !editedTime) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ ngày và giờ!");
      return;
    }

    const updatedAppointments = appointments.map((app) =>
      app.id === editingAppointment.id
        ? { ...app, date: editedDate, time: editedTime }
        : app
    );

    setAppointments(updatedAppointments);
    setEditingAppointment(null);
    await AsyncStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    Alert.alert("Thành công", "Lịch hẹn đã được cập nhật!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lịch Hẹn Của Bạn</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointment}>Chưa có lịch hẹn nào!</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {editingAppointment?.id === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedDate}
                    onChangeText={setEditedDate}
                    placeholder="Nhập ngày mới"
                  />
                  <TextInput
                    style={styles.input}
                    value={editedTime}
                    onChangeText={setEditedTime}
                    placeholder="Nhập giờ mới"
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                    <Text style={styles.buttonText}>Lưu</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.detail}>👨‍⚕️ Bác sĩ: {item.doctor}</Text>
                  <Text style={styles.detail}>📅 Ngày: {item.date}</Text>
                  <Text style={styles.detail}>⏰ Giờ: {item.time}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                      <Text style={styles.buttonText}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                      <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  noAppointment: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
  card: { backgroundColor: "#FFF", padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  detail: { fontSize: 16, color: "#444", marginBottom: 5 },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  editButton: { backgroundColor: "#FFA500", padding: 10, borderRadius: 8, width: "45%", alignItems: "center" },
  deleteButton: { backgroundColor: "#DC3545", padding: 10, borderRadius: 8, width: "45%", alignItems: "center" },
  saveButton: { backgroundColor: "#28A745", padding: 10, borderRadius: 8, marginTop: 5, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  input: { borderWidth: 1, borderColor: "#CCC", padding: 10, borderRadius: 8, marginBottom: 5, backgroundColor: "#FFF", fontSize: 16 },
});

export default AppointmentBookingScreen;
