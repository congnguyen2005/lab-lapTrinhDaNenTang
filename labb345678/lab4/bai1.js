import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';

const contacts = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0123456789' },
  { id: '2', name: 'Trần Thị B', phone: '0987654321' },
  { id: '3', name: 'Lê Văn C', phone: '0912345678' },
];

const Bai1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Bạ</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Bai1;
