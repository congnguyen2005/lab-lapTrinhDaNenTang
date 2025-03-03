import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import doctors from "./doctorsData";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setSuggestions(
        doctors.filter(
          (doc) =>
            doc.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Tìm bác sĩ theo tên, chuyên khoa..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => setSearchQuery(item.name)}>
                <Text style={styles.suggestionText}>{item.name} - {item.specialty}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  suggestionsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    marginTop: 5,
    padding: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDD",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
