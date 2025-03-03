import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, Dimensions } from "react-native";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import DoctorList from "./DoctorList";

const { width } = Dimensions.get("window");

const banners = [
  require("../../assets/banner.png"),
  require("../../assets/banner2.png"),
  require("../../assets/banner3.png"),
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll banner
  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Banner lướt */}
            <View style={styles.bannerContainer}>
              <FlatList
                ref={flatListRef}
                data={banners}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <Image source={item} style={styles.banner} />}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(event.nativeEvent.contentOffset.x / width);
                  setCurrentIndex(index);
                }}
              />
              {/* Dấu chấm chỉ số banner */}
              <View style={styles.pagination}>
                {banners.map((_, index) => (
                  <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                ))}
              </View>
            </View>

            {/* Thanh tìm kiếm */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Danh sách chuyên khoa */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Chuyên Khoa</Text>
              <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </View>
          </>
        }
        data={[]} // Để FlatList hoạt động mà không có dữ liệu
        renderItem={null} // Không render gì vì đã có ListHeaderComponent
        keyExtractor={(_, index) => index.toString()}
        nestedScrollEnabled
        ListFooterComponent={
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Danh Sách Bác Sĩ</Text>
            <DoctorList searchQuery={searchQuery} selectedCategory={selectedCategory} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  banner: {
    width: width - 40,
    height: 160,
    borderRadius: 15,
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007BFF",
    width: 10,
    height: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007BFF",
  },
});

export default HomeScreen;
