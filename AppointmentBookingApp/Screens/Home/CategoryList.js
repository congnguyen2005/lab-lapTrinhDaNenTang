import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Thêm thư viện biểu tượng
import { FontAwesome5 } from "@expo/vector-icons";

const categories = [
  { name: "Tất cả", icon: "list" },
  { name: "Nha sĩ", icon: "local_hospital" },
  { name: "Nội khoa", icon: "healing" },
  { name: "Nhi khoa", icon: "child-care" },
  { name: "Tim mạch", icon: "favorite" },
  { name: "Da liễu", icon: "skin" },
  { name: "Sản phụ khoa", icon: "pregnant-woman" },
];

const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.category, selectedCategory === item.name && styles.selected]}
            onPress={() => setSelectedCategory(item.name === "Tất cả" ? null : item.name)}
          >

<MaterialIcons name="local-hospital" size={24} color="blue" />
<FontAwesome5 name="user-md" size={24} color="blue" /> 
         <Text style={[styles.categoryText, selectedCategory === item.name && styles.selectedText]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  category: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: "#ddd", 
    marginRight: 10, 
    borderRadius: 5 
  },
  selected: { backgroundColor: "#007bff" },
  categoryText: { marginLeft: 5, color: "#007bff" },
  selectedText: { color: "white" },
});

export default CategoryList;