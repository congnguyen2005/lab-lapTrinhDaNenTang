import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DestinationDetail = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Ảnh nền */}
        <Image
          source={require("../assets/background.png")}
          style={styles.image}
        />

        <View style={styles.topButtons}>
          {/* Nút Back */}
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          {/* Nút tim và 3 chấm */}
          <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.heartButton}>
  <Ionicons name="heart" size={30} color="red" />
</TouchableOpacity>

            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tiêu đề và đánh giá */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PHỐ CỔ HỘI AN</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={styles.rating}>5.0</Text>
          </View>
        </View>

        {/* Nội dung chính */}
        <View style={styles.content}>
          {/* Địa điểm */}
          <View style={styles.location}>
            <Ionicons name="location-outline" size={18} color="blue" />
            <Text style={styles.locationText}>Quảng Nam</Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.description}>
            Hội An là một thành phố trực thuộc tỉnh Quảng Nam, Việt Nam. Phố cổ
            Hội An từng là một thương cảng quốc tế sầm uất...
          </Text>
        </View>
      </ScrollView>

      {/* Footer cố định */}
      <View style={styles.footer}>
        <Text style={styles.price}>
          $100 <Text style={styles.pricePerDay}>/ Ngày</Text>
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 120, // Để tránh footer che nội dung
  },
  image: {
    width: "100%",
    height: 250,
  },
  topButtons: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topButtons: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heartButton: {
    position: "absolute",
    top: 185, // Điều chỉnh vị trí xuống dưới một chút
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    width: 50, // ✅ Tăng chiều ngang
    height: 50, // ✅ Tăng chiều cao
    padding: 10,
    elevation: 5, // Bóng đổ giúp đẹp hơn trên Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

  },


  heartContainer: {
    alignItems: "center",
    justifyContent: "center",

  },
  titleContainer: {
    flexDirection: "row", // ✅ Căn theo hàng ngang
    justifyContent: "space-between", // ✅ Đẩy hai bên
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -60,
    paddingVertical: 10,
    borderRadius: 10,
  },  
  
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "white",
  },
  content: {
    padding: 20,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  pricePerDay: {
    fontSize: 14,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#003580",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DestinationDetail;
