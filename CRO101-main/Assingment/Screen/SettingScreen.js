import React, { useState } from 'react';

import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const settingsOptions = [
  { id: '1', title: 'History', icon: 'history' },
  { id: '2', title: 'Change Password', icon: 'user' },
  { id: '3', title: 'Address', icon: 'map-marker' },
  { id: '4', title: 'Payment Method', icon: 'credit-card' },
  { id: '5', title: 'About', icon: 'info-circle' },
  { id: '6', title: 'Help', icon: 'question-circle' },
  { id: '7', title: 'Log out', icon: 'sign-out' },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handlePress = (title) => {
    if (title === 'Log out') {
      setLogoutModalVisible(true);
    } else if (title === 'Change Password') {
      navigation.navigate('ChangePasswordScreen');
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Setting</Text>
      </View>
      
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item.title)}>
            <View style={styles.itemLeft}>
              <Icon name={item.icon} size={20} color="#ff8c00" style={styles.icon} />
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={15} color="#fff" />
          </TouchableOpacity>
        )}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure want to logout!</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonNo]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonYes]} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
  },
  header: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonNo: {
    backgroundColor: '#333',
  },
  modalButtonYes: {
    backgroundColor: '#ff8c00',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
