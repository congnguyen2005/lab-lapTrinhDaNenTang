import React from "react";
import { styles } from "./styles";
import { ImageBackground, StatusBar, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"

const DetailScreen = () => {
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        <ImageBackground
          source={require('../asset/image.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>PHỐ CỔ HỘI AN</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart" size={28} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={18} color="#1E88E5" />
          <Text style={styles.location}>Quảng Nam</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>5.0</Text>
        </View>
        <Text style={styles.description}>
          Hội An là một thành phố cổ tại Quảng Nam, nổi tiếng với những ngôi nhà cổ và đèn lồng rực rỡ.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>$100 /Ngày</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailScreen;