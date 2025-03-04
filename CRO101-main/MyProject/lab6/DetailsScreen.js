
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào bạn, Quang Thuận</Text>
      <Text style={styles.subtitle}>Id của bạn là: PD09734</Text>
      <View style={styles.buttonContainer}>
        <Button title="TRỞ LẠI BẰNG - GO BACK -" onPress={() => navigation.goBack()} color="#007BFF" />
        <Button title="TRỞ LẠI BẰNG - RESET -" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} color="#007BFF" />
        <Button title="TRỞ LẠI BẰNG - POP -" onPress={() => navigation.pop()} color="#007BFF" />
        <Button title="TRỞ LẠI BẰNG - POPTOTOP -" onPress={() => navigation.popToTop()} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default DetailScreen;
