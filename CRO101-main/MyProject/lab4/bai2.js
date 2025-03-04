import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, RefreshControl, StyleSheet } from 'react-native';

export default function Lab4Bai2Screen() {
  const [refreshing, setRefreshing] = useState(false);
  const [bgColor, setBgColor] = useState('#DFF6FF'); // Màu nền ban đầu của StatusBar

  const onRefresh = () => {
    setRefreshing(true);

    // Tạo danh sách màu để đổi ngẫu nhiên
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    setTimeout(() => {
      setBgColor(newColor);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.text}>Kéo xuống để đổi màu Statusbar</Text>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold' },
});