import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar, Text } from 'react-native';
import styles from './styles';

const Bai2 = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [barStyle, setBarStyle] = useState('default');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBarStyle(barStyle === 'dark-content' ? 'light-content' : 'dark-content');
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <StatusBar barStyle={barStyle} />
      <Text style={styles.title}>Kéo xuống để thay đổi màu StatusBar</Text>
    </ScrollView>
  );
};

export default Bai2;
