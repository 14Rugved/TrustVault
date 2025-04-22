import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addAppointment, getPatients } from '../services/database';

function AddAppointment({ onSendAppointment }) {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    time: "",
    reason: ""
  });

  useEffect(() => {
    // Fetch patients when component mounts
    const fetchPatients = async () => {
      try {
        const result = await getPatients();
        setPatients(result.rows._array);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    try {
      await addAppointment(
        parseInt(formData.patientId),
        formData.date,
        formData.time,
        formData.reason
      );
      onSendAppointment(); // Refresh the appointments list
      setFormData({
        patientId: "",
        date: "",
        time: "",
        reason: ""
      });
      setToggleForm(false);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setToggleForm(!toggleForm)}
        style={[styles.toggleButton, toggleForm && styles.toggleButtonActive]}
      >
        <View style={styles.toggleButtonContent}>
          <Ionicons name="add" size={24} color={toggleForm ? "#1d4ed8" : "#374151"} />
          <Text style={[styles.toggleButtonText, toggleForm && styles.toggleButtonTextActive]}>
            Add New Appointment
          </Text>
        </View>
      </TouchableOpacity>
      
      {toggleForm && (
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Patient</Text>
            <View style={styles.selectContainer}>
              <TextInput
                style={styles.select}
                value={formData.patientId}
                onChangeText={(value) => setFormData({ ...formData, patientId: value })}
                placeholder="Select a patient"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(value) => setFormData({ ...formData, date: value })}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              value={formData.time}
              onChangeText={(value) => setFormData({ ...formData, time: value })}
              placeholder="HH:MM"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Reason</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.reason}
              onChangeText={(value) => setFormData({ ...formData, reason: value })}
              placeholder="Enter appointment reason"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Schedule Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleButtonActive: {
    backgroundColor: '#eff6ff',
  },
  toggleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  toggleButtonTextActive: {
    color: '#1d4ed8',
  },
  formContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  select: {
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddAppointment; 