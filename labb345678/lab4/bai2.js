import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar, Text } from 'react-native';
import styles from './styles';

const Bai2 = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [barStyle, setBarStyle] = useState('dark-content');
  const [statusKey, setStatusKey] = useState(0); // Thêm key để ép `StatusBar` render lại

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBarStyle((prevStyle) => (prevStyle === 'dark-content' ? 'light-content' : 'dark-content'));
      setStatusKey((prevKey) => prevKey + 1); // Cập nhật key để `StatusBar` render lại
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Dùng key để ép StatusBar cập nhật */}
      <StatusBar key={statusKey} barStyle={barStyle} />
      
      <Text style={styles.title}>Kéo xuống để thay đổi màu StatusBar</Text>
      
      {/* Thêm nội dung giả để có thể kéo xuống */}
      <View style={{ height: 800, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nội dung giả</Text>
      </View>

    </ScrollView>
  );
};

export default Bai2;
