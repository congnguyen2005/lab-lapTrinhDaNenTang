import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import doctors from "./doctorsData";

const DoctorList = ({ searchQuery, selectedCategory }) => {
  const navigation = useNavigation();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    let filtered = doctors;

    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((doctor) => doctor.specialty === selectedCategory);
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.specialty}</Text>
              <Text style={styles.rating}>⭐ {item.rating} / 5</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lịch hẹn", { screen: "BookingScreen", params: { doctor: item } })}
              >
                <Text style={styles.buttonText}>Đặt lịch ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: "row", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  info: { flex: 1 },
  name: { fontWeight: "bold" },
  rating: { color: "green", marginTop: 5 },
  button: { backgroundColor: "#007bff", padding: 5, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center" },
});

export default DoctorList;
