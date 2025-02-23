// Home.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text style={styles.description}>
        Đây là màn hình Home. Bạn có thể điều hướng sang các màn hình khác hoặc thực hiện một số hành động tại đây.
      </Text>

      <Button
        title="Go to Document"
        onPress={() => navigation.navigate("Document")}
      />

      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("Chat")}
        color="#6200EE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
});
