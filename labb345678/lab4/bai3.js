import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const Bai3 = () => {
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput placeholder="Nhập tài khoản" style={styles.input} />
        
        <View style={styles.passwordContainer}>
          <TextInput 
            placeholder="Nhập mật khẩu" 
            style={styles.inputPassword} 
            secureTextEntry={secureText} 
            onChangeText={setPassword} 
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Button title="Đăng Nhập" onPress={() => alert('Đăng nhập thành công!')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Bai3;
