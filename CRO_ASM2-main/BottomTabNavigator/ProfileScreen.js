import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const settingsOptions = [
    { icon: 'time-outline', label: 'History' },
    { icon: 'location-outline', label: 'Address' },
    { icon: 'card-outline', label: 'Payment Method' },
    { icon: 'information-circle-outline', label: 'About' },
    { icon: 'help-circle-outline', label: 'Help' },
    { icon: 'log-out-outline', label: 'Log out', action: 'logout' },
];

export default function SettingsScreen() {
    const [userData, setUserData] = useState({ name: '', avatar: null });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('user_data');
                const user = storedData ? JSON.parse(storedData) : {};
                setUserData(user);

                const storedDarkMode = await AsyncStorage.getItem('dark_mode');
                setIsDarkMode(storedDarkMode === 'true');
            } catch (error) {
                console.log('Lỗi khi tải dữ liệu:', error);
            }
        };

        loadUserData();
        const unsubscribe = navigation.addListener('focus', loadUserData);
        return unsubscribe;
    }, [navigation]);

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await AsyncStorage.setItem('dark_mode', newMode.toString());
    };

    const handleOptionPress = (item) => {
        if (item.action === 'logout') {
            Alert.alert(
                "Log Out",
                "Are you sure you want to log out?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: () => navigation.replace('Login') }
                ]
            );
        } else if (item.label === 'Payment Method') {
            navigation.navigate('PaymentScreen');
        } else if (item.label === 'Address') {
            navigation.navigate('AddressScreen');
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.header, isDarkMode && styles.darkText]}>Settings</Text>

            <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('EditProfile')}>
                <Image source={userData.avatar ? { uri: userData.avatar } : require('../assets/icon.png')} style={styles.avatar} />
                <Text style={[styles.username, isDarkMode && styles.darkText]}>{userData.name || 'Guest'}</Text>
            </TouchableOpacity>

            <FlatList
                data={settingsOptions}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.optionContainer} onPress={() => handleOptionPress(item)}>
                        <Ionicons name={item.icon} size={24} color={isDarkMode ? "#E07A5F" : "#E07A5F"} style={styles.icon} />
                        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>{item.label}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color={isDarkMode ? "#aaa" : "#ccc"} />
                    </TouchableOpacity>
                )}
            />

            {/* Nút bật/tắt Dark Mode */}
            <View style={styles.darkModeContainer}>
                <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },
    darkContainer: { backgroundColor: '#121212' },
    header: { fontSize: 22, fontWeight: 'bold', color: 'black', alignSelf: 'center', marginVertical: 20 },
    darkText: { color: 'white' },
    userInfo: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#555' },
    username: { fontSize: 16, color: 'black', fontWeight: 'bold' },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    icon: { marginRight: 15 },
    optionText: { flex: 1, fontSize: 16, color: 'black' },
    darkModeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
});


