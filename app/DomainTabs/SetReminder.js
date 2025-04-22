import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SetReminder() {
  const router = useRouter();
  const { document } = useLocalSearchParams();
  const docData = document ? JSON.parse(document) : {};
  
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSetReminder = () => {
    Alert.alert("Reminder Set", `Reminder for ${docData.patientName} on ${reminderDate.toLocaleString()}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Reminder</Text>
      <Text style={styles.label}>👤 Patient: {docData.patientName}</Text>
      <Text style={styles.label}>🩺 Doctor: {docData.doctorName}</Text>
      <Text style={styles.label}>💊 Medication: {docData.medication}</Text>

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateButtonText}>📅 Select Date & Time</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={reminderDate}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setReminderDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.setButton} onPress={handleSetReminder}>
        <Text style={styles.setButtonText}>✔ Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 20,
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  setButton: {
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 5,
    marginTop: 20,
  },
  setButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
