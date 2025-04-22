import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import Sidebar from './Sidebar';

const ReceptionistPage = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.hamburgerButton} 
          onPress={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Receptionist</Text>
        <View style={styles.headerIcons}>
          {/* Profile Icon */}
          <TouchableOpacity style={styles.iconCircle} onPress={() => router.push('/profile')}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <Path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#000000"
              />
            </Svg>
          </TouchableOpacity>

          {/* Settings Icon */}
          <TouchableOpacity style={styles.iconCircle} onPress={() => router.push('/settings')}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <Path
                d="M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.11-.22-.37-.3-.59-.22l-2.49 1a8.12 8.12 0 0 0-1.74-1.01l-.38-2.65A.488.488 0 0 0 14 2h-4c-.24 0-.45.17-.49.4l-.38 2.65c-.63.25-1.2.57-1.74 1.01l-2.49-1a.484.484 0 0 0-.59.22l-2 3.46c-.12.22-.07.49.12.64L4.57 11c-.04.32-.07.66-.07 1s.03.68.07 1l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.11.22.37.3.59.22l2.49-1c.54.44 1.11.76 1.74 1.01l.38 2.65c.04.23.25.4.49.4h4c.24 0 .45-.17.49-.4l.38-2.65c.63-.25 1.2-.57 1.74-1.01l2.49 1c.22.08.48 0 .59-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                fill="#000000"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => router.push('/Receptionist/PatientTab')}>
              <Text style={styles.sectionTitle}>Today's Appointments</Text>
            </TouchableOpacity>
            <View style={styles.card}>
              <Text style={styles.appointment}>John Smith - 10:00 AM - Consultation</Text>
              <Text style={styles.appointment}>Emily Johnson - 11:30 AM - Follow-up</Text>
              <Text style={styles.appointment}>Michael Lee - 2:00 PM - New Patient</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Prescriptions</Text>
            <View style={styles.card}>
              <Text style={styles.prescription}>Lisa Brown - Amoxicillin</Text>
              <Text style={styles.prescription}>David Wilson - Ibuprofen</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fee Receipts</Text>
            <View style={styles.card}>
              <Text style={styles.receipt}>Receipt #1234 - $200</Text>
              <Text style={styles.receipt}>Receipt #1235 - $150</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
    marginTop: 20,
  },
  hamburgerButton: {
    padding: 5,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 15,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  appointment: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
  prescription: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
  receipt: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
});

export default ReceptionistPage; 