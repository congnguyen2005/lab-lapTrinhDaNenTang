import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const AppointmentBookingScreen = () => {
  const route = useRoute();
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem("appointments");
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch hẹn:", error);
      }
    };
    loadAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setSelectedDate(new Date()); // Đặt ngày mặc định là ngày hiện tại
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setShowDatePicker(false);
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event, date) => {
    if (date) {
      setShowTimePicker(false);
      setSelectedDate(date);
    }
  };

  const handleSaveEdit = async () => {
    if (selectedDate <= new Date()) {
      Alert.alert("Lỗi", "Ngày và giờ phải lớn hơn thời gian hiện tại!");
      return;
    }

    Alert.alert("Xác nhận", "Bạn có chắc muốn cập nhật lịch hẹn này?", [
      { text: "Hủy" },
      {
        text: "Lưu",
        onPress: async () => {
          const updatedAppointments = appointments.map((app) =>
            app.id === editingAppointment.id
              ? { ...app, date: selectedDate.toLocaleDateString(), time: selectedDate.toLocaleTimeString() }
              : app
          );
          setAppointments(updatedAppointments);
          setEditingAppointment(null);
          await AsyncStorage.setItem("appointments", JSON.stringify(updatedAppointments));
          Alert.alert("Thành công", "Lịch hẹn đã được cập nhật!");
        },
      },
    ]);
  };

  const handleDelete = (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn hủy lịch hẹn này?", [
      { text: "Không" },
      {
        text: "Có",
        onPress: async () => {
          const updatedAppointments = appointments.filter((app) => app.id !== id);
          setAppointments(updatedAppointments);
          AsyncStorage.setItem("appointments", JSON.stringify(updatedAppointments));
          Alert.alert("Thông báo", "Lịch hẹn đã được hủy!");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lịch Hẹn Của Bạn</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {editingAppointment?.id === item.id ? (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                  <Text style={styles.buttonText}>📅 Chọn ngày: {selectedDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="calendar"
                    minimumDate={new Date()}
                    onChange={handleDateChange}
                  />
                )}

                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                  <Text style={styles.buttonText}>⏰ Chọn giờ: {selectedDate.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="time"
                    display="clock"
                    onChange={handleTimeChange}
                  />
                )}

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
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  card: { backgroundColor: "#FFF", padding: 15, borderRadius: 12, marginBottom: 10, elevation: 3 },
  detail: { fontSize: 16, color: "#444", marginBottom: 5 },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  editButton: { backgroundColor: "#FFA500", padding: 10, borderRadius: 8, width: "45%", alignItems: "center" },
  deleteButton: { backgroundColor: "#DC3545", padding: 10, borderRadius: 8, width: "45%", alignItems: "center" },
  saveButton: { backgroundColor: "#28A745", padding: 10, borderRadius: 8, marginTop: 5, alignItems: "center" },
  dateButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 8, marginBottom: 5, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default AppointmentBookingScreen;
