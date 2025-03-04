import React, { useEffect } from "react";
import { View, Text, Animated, Image } from "react-native";
import styles from "./styles";

const SplashScreen = ({ onFinish }) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(onFinish, 1000);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/spalsh1.jpg")}
                style={[styles.logo, { opacity: fadeAnim }]}
            />
            <Text style={styles.text}>Reputation comes first.</Text>
        </View>
    );
};

export default SplashScreen;
