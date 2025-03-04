import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from './api/firebaseConfig'; // Import Firebase auth
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import Firebase Authentication methods
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // State to hold selected avatar image

  const handlePasswordChange = async () => {
    if (newPassword !== retypePassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const user = auth.currentUser; // Get the currently logged-in user

    if (user) {
      try {
        // Reauthenticate user with their current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        Alert.alert("Success", "Your password has been updated.");
        navigation.goBack();
      } catch (error) {
        console.error("Error updating password:", error);
        Alert.alert("Error", "Could not update your password. Please try again.");
      }
    } else {
      Alert.alert("Error", "No user is logged in.");
    }
  };

  // Function to launch image picker and select an image
  const chooseImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setAvatar(response.assets[0].uri); // Set selected image URI to state
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Change Password</Text>
      </View>

      {/* Avatar Container */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Image source={require('./assets/icon.png')} style={styles.avatar} />
        )}
        <TouchableOpacity style={styles.editAvatarButton} onPress={chooseImage}>
          <Icon name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Current Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#fff"
        secureTextEntry
        onChangeText={setCurrentPassword}
      />

      {/* New Password Input */}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#fff"
        secureTextEntry
        onChangeText={setNewPassword}
      />

      {/* Re-type New Password */}
      <TextInput
        style={styles.input}
        placeholder="Re-type New Password"
        placeholderTextColor="#fff"
        secureTextEntry
        onChangeText={setRetypePassword}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
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
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
