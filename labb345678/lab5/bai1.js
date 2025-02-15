import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.customFont}>Hello, Custom Font!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customFont: {
    fontFamily: 'Roboto-Italic-VariableFont_wdth,wght', // Thay bằng tên font của bạn
    fontSize: 24,
  },
});
