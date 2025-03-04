import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';

const contacts = [
  { name: 'Mylah Myles', email: 'mylah@example.com', position: 'Data Entry Clerk', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'June Cha', email: 'june@example.com', position: 'Sales Manager', photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Iida Niskanen', email: 'iida@example.com', position: 'Sales Manager', photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { name: 'Jonathan Nuñez', email: 'jonathan@example.com', position: 'Clerical', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
];

const ContactItem = ({ contact }) => (
  <View style={styles.listItem}>
    <Image source={{ uri: contact.photo }} style={styles.avatar} />
    <View style={styles.bodyItem}>
      <Text style={styles.nameText}>{contact.name}</Text>
      <Text>{contact.position}</Text>
    </View>
    <TouchableOpacity style={styles.btnCall}>
      <Text style={styles.callText}>Call</Text>
    </TouchableOpacity>
  </View>
);

export default function Lab4Bai1Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
      <FlatList 
        data={contacts} 
        renderItem={({ item }) => <ContactItem contact={item} />} 
        keyExtractor={(item) => item.email} 
      />
            <Button title="Đi tới Bài 2" onPress={() => navigation.navigate('Lab4_Bai2')} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 10 },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  bodyItem: { flex: 1 },
  nameText: { fontSize: 16, fontWeight: 'bold' },
  btnCall: { padding: 10 },
  callText: { color: 'green', fontSize: 16, fontWeight: 'bold' },
});
