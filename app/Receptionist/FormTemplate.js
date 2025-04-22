import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FormTemplate = () => {
  const router = useRouter();
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [medication, setMedication] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleGenerateTemplate = async () => {
    try {
      console.log("Sending data...");
      const response = await fetch("http://192.168.1.5:3000/api/generate-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          doctorName,
          medication,
          followUpDate,
          notes,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
      alert("Template sent successfully!");
      router.push('/Receptionist/TemplateRenderer');
    } catch (error) {
      console.error("Error sending template:", error);
      alert("Failed to send template. Check your connection.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
          placeholder="Enter patient name"
        />

        <Text style={styles.label}>Doctor Name</Text>
        <TextInput
          style={styles.input}
          value={doctorName}
          onChangeText={setDoctorName}
          placeholder="Enter doctor name"
        />

        <Text style={styles.label}>Medication</Text>
        <TextInput
          style={styles.input}
          value={medication}
          onChangeText={setMedication}
          placeholder="Enter medication details"
        />

        <Text style={styles.label}>Follow-up Date</Text>
        <TextInput
          style={styles.input}
          value={followUpDate}
          onChangeText={setFollowUpDate}
          placeholder="Enter follow-up date"
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter additional notes"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleGenerateTemplate}>
          <Text style={styles.buttonText}>Generate Template</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  input: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormTemplate;
