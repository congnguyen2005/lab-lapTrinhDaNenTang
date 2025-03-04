import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem('email');
            const savedPassword = await AsyncStorage.getItem('password');
            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.log('Error loading credentials', error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (!foundUser) {
                setError('Incorrect email or password');
                return;
            }

            if (rememberMe) {
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('password', password);
            } else {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
            }

            await AsyncStorage.setItem('username', foundUser.name || 'User');

            navigation.navigate('Home');
        } catch (error) {
            console.log('Error logging in', error);
        }
    };

    return (
        <ImageBackground source={require('../../assets/background1.png')} style={styles.background}>
            <View style={styles.card}>
                <Text style={styles.title}>Welcome Back!</Text>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={24} color="#888" />
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock-outline" size={24} color="#888" />
                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton}>
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Register</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={styles.linkText}>Forgot Password? <Text style={styles.linkHighlight}>Click Reset</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
