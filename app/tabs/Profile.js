import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, ScrollView, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth, db } from "./../../configs/firebaseConfig";
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.replace('/');
          return;
        }

        const patientDoc = await getDoc(doc(db, 'patient', user.uid));
        if (patientDoc.exists()) {
          setUserData(patientDoc.data());
        } else {
          // If not found in patient collection, check receptionist collection
          const receptionistDoc = await getDoc(doc(db, 'receptionist', user.uid));
          if (receptionistDoc.exists()) {
            setUserData(receptionistDoc.data());
          } else {
            throw new Error('User data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" color="black" size={25} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={[styles.profileSection, { paddingHorizontal: width * 0.05 }]}>
        <Image
          source={{ uri: userData?.photoURL || "https://wallpapers.com/images/hd/user-profile-placeholder-icon-8uxbdj1myl7rm20u.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData?.name || 'Loading...'}</Text>
        <Text style={styles.profileEmail}>{userData?.email || ''}</Text>
      </View>

      {/* Settings Options */}
      <View style={[styles.settingsContainer, { paddingHorizontal: width * 0.05 }]}>
        <SettingItem 
          title="Change Password" 
          icon="lock" 
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
        <SettingItem 
          title="Notifications" 
          icon="bell" 
          toggle
          value={userData?.notifications ?? true}
          onToggle={(value) => {
            // TODO: Implement notification settings update
            Alert.alert('Coming Soon', 'This feature will be available soon.');
          }}
        />
        <SettingItem 
          title="Help & FAQs" 
          icon="help-circle"
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
        <SettingItem 
          title="Privacy Policy" 
          icon="shield"
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
        <SettingItem 
          title="Terms & Conditions" 
          icon="file-text"
          onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon.')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { marginHorizontal: width * 0.05 }]}
        onPress={handleSignOut}
      >
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SettingItem = ({ title, icon, toggle, value, onToggle, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={toggle ? undefined : onPress}
      disabled={!onPress && !toggle}
    >
      <View style={styles.settingItemLeft}>
        <Feather name={icon} size={20} style={styles.settingIcon} />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {toggle ? (
        <Switch 
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#ddd', true: '#000' }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Feather name="chevron-right" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  settingsContainer: {
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
    color: '#333',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
