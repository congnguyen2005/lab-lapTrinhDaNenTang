import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { name } = route.params || {}; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào bạn, {name || 'khách'}</Text>
      <Text style={styles.subtitle}>ID của bạn là: PD10143</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="TRỞ LẠI BẰNG - GO BACK -" 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : alert('Không có màn hình để quay lại!')} 
          color="#0000ff" 
        />
        <Button 
          title="TRỞ LẠI BẰNG - RESET -" 
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} 
          color="#0000ff" 
        />
        <Button 
          title="TRỞ LẠI BẰNG - POP -" 
          onPress={() => navigation.canGoBack() ? navigation.pop() : alert('Không có màn hình để quay lại!')} 
          color="#0000ff" 
        />
        <Button 
          title="TRỞ LẠI BẰNG - POPTOTOP -" 
          onPress={() => navigation.canGoBack() ? navigation.popToTop() : alert('Không có màn hình để quay lại!')} 
          color="#0000ff" 
        />
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
  subtitle:{
    marginBottom :10,
  },
  buttonContainer: {
    width: '80%',
    backgroundColor:'#f04444',
  },
});

export default DetailScreen;
