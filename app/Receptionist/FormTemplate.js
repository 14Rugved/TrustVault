import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import TemplateRenderer from './TemplateRenderer'; // Import the updated template renderer

const { width } = Dimensions.get('window');

const FormTemplate = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [medication, setMedication] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showTemplate, setShowTemplate] = useState(false); // To control template rendering

  // const handleGenerateTemplate = () => {
  // };

  const handleGenerateTemplate = async () => {
    console.log("meta")
    setShowTemplate(true); // Set the flag to true when generating template
    try {
      console.log("Sending data...");
      const response = await fetch("http://192.168.18.197:3000/api/generate-template", {
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
    } catch (error) {
      console.error("Error sending template:", error);
      alert("Failed to send template. Check your connection.");
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}> Patient Name: </Text>
        <TextInput
          placeholder="Patient Name"
          value={patientName}
          onChangeText={setPatientName}
          style={styles.input}
        />
        <Text style={styles.text}> Doctor Name: </Text>
        <TextInput
          placeholder="Doctor Name"
          value={doctorName}
          onChangeText={setDoctorName}
          style={styles.input}
        />
        <Text style={styles.text}> Medications: </Text>
        <TextInput
          placeholder="Medication"
          value={medication}
          onChangeText={setMedication}
          style={styles.input}
        />
        <Text style={styles.text}> Follow Up Date: </Text>
        <TextInput
          placeholder="Follow-Up Date (YYYY-MM-DD)"
          value={followUpDate}
          onChangeText={setFollowUpDate}
          style={styles.input}
        />
        <Text style={styles.text}> Notes </Text>
        <TextInput
          placeholder="Additional Notes"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, styles.notesInput]}
          multiline={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleGenerateTemplate}>
          <Text style={styles.buttonText}>Generate Template</Text>
        </TouchableOpacity>

        {/* Conditionally Render the TemplateRenderer */}
        {showTemplate && (
          <TemplateRenderer
            patientName={patientName}
            doctorName={doctorName}
            medication={medication}
            followUpDate={followUpDate}
            notes={notes}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  input: {
    marginTop: 10,
    padding: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    width: 325,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    backgroundColor: 'black',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: width > 786 ? '30%' : '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default FormTemplate;
