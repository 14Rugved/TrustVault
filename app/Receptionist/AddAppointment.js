import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addAppointment, getPatients } from '../services/database';

function AddAppointment({ onSendAppointment }) {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    time: "",
    reason: ""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getPatients();
        setPatients(result);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients. Please try again.");
        Alert.alert("Error", "Failed to load patients. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    if (!formData.patientId || !formData.date || !formData.time || !formData.reason) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
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
      Alert.alert("Success", "Appointment added successfully");
    } catch (error) {
      console.error("Error adding appointment:", error);
      setError("Failed to add appointment. Please try again.");
      Alert.alert("Error", "Failed to add appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setToggleForm(!toggleForm)}
      >
        <Ionicons
          name={toggleForm ? "close-circle" : "add-circle"}
          size={24}
          color="#2563eb"
        />
        <Text style={styles.toggleButtonText}>
          {toggleForm ? "Cancel" : "Add Appointment"}
        </Text>
      </TouchableOpacity>

      {toggleForm && (
        <ScrollView style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Patient</Text>
            <View style={styles.selectContainer}>
              <TextInput
                style={styles.select}
                value={formData.patientId}
                onChangeText={(value) => setFormData({ ...formData, patientId: value })}
                placeholder="Select patient"
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
              placeholder="Enter reason for appointment"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Adding..." : "Add Appointment"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  toggleButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#2563eb",
  },
  form: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
  },
  select: {
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
});

export default AddAppointment; 