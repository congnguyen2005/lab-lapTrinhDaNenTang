import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const DoctorProfileScreen = ({ navigation }) => {
  const doctor = {
    id: "1",
    name: "BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    experience: "10 năm kinh nghiệm",
    image: "https://via.placeholder.com/100",
    rating: 4.5,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <Text style={styles.experience}>{doctor.experience}</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Lịch hẹn", { screen: "BookingScreen", params: { doctor } })}
      >
        <Text style={styles.buttonText}>Đặt lịch hẹn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold" },
  specialty: { fontSize: 18, color: "gray" },
  experience: { fontSize: 16, marginVertical: 5 },
  button: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 20 },
  buttonText: { color: "white", fontSize: 18 },
});

export default DoctorProfileScreen;
