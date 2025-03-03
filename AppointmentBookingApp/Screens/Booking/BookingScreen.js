import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (!route.params?.doctor) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin bác sĩ!", [
        { text: "Quay lại", onPress: () => navigation.goBack() },
      ]);
    }
  }, [route.params, navigation]);

  const doctor = route.params?.doctor;
  if (!doctor) return null;

  const handleConfirm = () => {
    const now = new Date();
    const selectedDate = new Date(date);
    
    // Kiểm tra ngày không được nhỏ hơn hôm nay
    if (selectedDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
      Alert.alert("Lỗi", "Ngày đặt lịch phải từ ngày mai trở đi!");
      return;
    }

    if (!time) {
      Alert.alert("Lỗi", "Vui lòng chọn giờ hẹn!");
      return;
    }

    // Kiểm tra giờ hợp lệ
    const [selectedHour, selectedMinute] = time.split(":").map(Number);
    selectedDate.setHours(selectedHour, selectedMinute, 0);

    if (selectedDate.getTime() < now.getTime()) {
      Alert.alert("Lỗi", "Giờ hẹn không hợp lệ, phải lớn hơn thời gian hiện tại!");
      return;
    }

    navigation.navigate("BookingConfirmation", { doctor, date, time });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn ngày & giờ</Text>

      {/* Thông tin bác sĩ */}
      <View style={styles.doctorCard}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
        </View>
      </View>

      {/* Chọn ngày */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputButton}>
        <Text style={styles.inputText}>{date.toLocaleDateString("vi-VN") || "Chọn ngày"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                  setShowDatePicker(false);
                }}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.modalClose}>
                <Text style={{ color: "red" }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Chọn giờ */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputButton}>
        <Text style={styles.inputText}>{time ? time : "Chọn giờ"}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    const now = new Date();
                    const selectedHour = selectedTime.getHours();
                    const selectedMinute = selectedTime.getMinutes();
                    
                    if (date.toDateString() === now.toDateString() && 
                        (selectedHour < now.getHours() || 
                        (selectedHour === now.getHours() && selectedMinute <= now.getMinutes()))) {
                      Alert.alert("Lỗi", "Giờ phải lớn hơn thời gian hiện tại!");
                    } else {
                      setTime(`${selectedHour}:${selectedMinute < 10 ? "0" : ""}${selectedMinute}`);
                    }
                  }
                  setShowTimePicker(false);
                }}
              />
              <TouchableOpacity onPress={() => setShowTimePicker(false)} style={styles.modalClose}>
                <Text style={{ color: "red" }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Nút xác nhận */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#333" },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20,
  },
  doctorImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  doctorInfo: { flex: 1 },
  doctorName: { fontSize: 20, fontWeight: "bold", color: "#444" },
  doctorSpecialty: { color: "gray" },
  inputButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginBottom: 10,
  },
  inputText: { fontSize: 16, color: "#555" },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 300, alignItems: "center" },
  modalClose: { marginTop: 10, padding: 10 },
});

export default BookingScreen;
