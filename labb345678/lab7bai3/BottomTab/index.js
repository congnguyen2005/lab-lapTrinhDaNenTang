import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TopTabs from "../TopTabs/index";

const Tab = createBottomTabNavigator();

// Home Screen
const HomeScreen = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <TopTabs />
    </SafeAreaView>
);

// Saved Screen
const SavedScreen = ({ route }) => {
    const savedSongs = route.params?.savedSongs || [];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Bài Hát Đã Lưu</Text>
            {savedSongs.length === 0 ? (
                <Text style={styles.emptyText}>Chưa có bài hát nào được lưu!</Text>
            ) : (
                <FlatList
                    data={savedSongs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.artist}>{item.artist}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

// Profile Screen
const ProfileScreen = () => {
    return (
        <LinearGradient colors={["#f9f9f9", "#e6e6e6"]} style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGJHlXch3ZuBzTusRjzMybECMjRWPeGSbBQ&s" }} // Ảnh đại diện mẫu
                    style={styles.avatar}
                />
            </View>

            {/* Thông tin người dùng */}
            <Text style={styles.name}>Đặng Công Nguyên</Text>
            <Text style={styles.email}>nguyendcpd10143@gmail.com</Text>

            {/* Danh sách tuỳ chọn */}
            <View style={styles.menu}>
                <MenuItem icon="person-circle-outline" text="Chỉnh sửa hồ sơ" onPress={() => console.log("Edit Profile")} />
                <MenuItem icon="settings-outline" text="Cài đặt" onPress={() => console.log("Settings")} />
                <MenuItem icon="log-out-outline" text="Đăng xuất" color="#FF3B30" onPress={() => console.log("Logout")} />
            </View>
        </LinearGradient>
    );
};

// Component menu item
const MenuItem = ({ icon, text, color = "#333", onPress }) => (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={[styles.menuText, { color }]}>{text}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#999" style={styles.chevron} />
    </TouchableOpacity>
);

// Icon component tối ưu
const TabBarIcon = ({ route, focused, color, size }) => {
    let iconName;
    if (route.name === "Home") iconName = focused ? "home" : "home-outline";
    else if (route.name === "Saved") iconName = focused ? "bookmark" : "bookmark-outline";
    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

    return <Ionicons name={iconName} size={size} color={color} />;
};

// Bottom Tabs
const BottomTabs = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: (props) => <TabBarIcon route={route} {...props} />,
                    tabBarActiveTintColor: "#4B0082",
                    tabBarInactiveTintColor: "#999",
                    tabBarStyle: { backgroundColor: "white", height: 60, borderTopWidth: 0 },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Saved" component={SavedScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#4B0082",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
        marginTop: 20,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artist: {
        fontSize: 14,
        color: "#666",
    },
    avatarContainer: {
        borderWidth: 3,
        borderColor: "#4B0082",
        borderRadius: 60,
        padding: 5,
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    menu: {
        width: "85%",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    chevron: {
        opacity: 0.5,
    },
});

export default BottomTabs;
