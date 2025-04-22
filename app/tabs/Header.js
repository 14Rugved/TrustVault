import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/firebaseConfig';

export default function Header({ userData }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const userInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("./../../assets/images/zoomedLogo.png")}
          style={styles.image}
        />

        <View style={styles.userProfile}>
          <TouchableOpacity 
            style={styles.userIcon}  
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text style={styles.userInitial}>{userInitial}</Text> 
          </TouchableOpacity>
        </View>
      </View>

      {showMenu && (
        <Modal
          transparent={true}
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  router.push('/tabs/Profile');
                }}
              >
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.menuItem, styles.signOutButton]}
                onPress={handleSignOut}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    paddingTop: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  image: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#f7f7f7',
    borderRadius: 40,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
  },
  userInitial: {
    fontSize: 21,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
  signOutButton: {
    backgroundColor: '#ffebee',
    marginTop: 5,
  },
  signOutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '500',
  },
});