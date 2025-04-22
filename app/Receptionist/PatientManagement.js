import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const PatientManagement = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentDate: '',
    patientPhoneNumber: '',
    patientDisease: '',
    cost: '',
    prescription: '',
  });

  const pickerItems = [
    { label: 'Covid19', value: 'Covid19' },
    { label: 'Diabetes', value: 'Diabetes' },
    { label: 'Flu', value: 'Flu' },
    { label: 'Fever', value: 'Fever' },
    { label: 'Heart Disease', value: 'HeartDisease' },
    { label: 'Diarrheal', value: 'Diarrheal' },
  ];

  const handleSubmit = async () => {
    if (!formData.patientName || !formData.appointmentDate || !formData.patientPhoneNumber || 
        !formData.patientDisease || !formData.cost || !formData.prescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Patient added successfully!');
        router.back();
      } else {
        throw new Error('Failed to add patient');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add patient. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFormData({
      ...formData,
      appointmentDate: currentDate.toISOString().split('T')[0],
    });
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add New Patient</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patient name"
            value={formData.patientName}
            onChangeText={(text) => setFormData({ ...formData, patientName: text })}
          />

          <Text style={styles.label}>Appointment Date</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {formData.appointmentDate || 'Select Appointment Date'}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="numeric"
            value={formData.patientPhoneNumber}
            onChangeText={(text) => setFormData({ ...formData, patientPhoneNumber: text })}
          />

          <Text style={styles.label}>Disease</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setFormData({ ...formData, patientDisease: value })}
              items={pickerItems}
              style={pickerSelectStyles}
              value={formData.patientDisease}
              placeholder={{
                label: 'Select Disease',
                value: null,
                color: '#9EA0A4',
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <Text style={styles.label}>Cost</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter cost"
            keyboardType="numeric"
            value={formData.cost}
            onChangeText={(text) => setFormData({ ...formData, cost: text })}
          />

          <Text style={styles.label}>Prescription</Text>
          <TextInput
            style={[styles.input, styles.prescriptionInput]}
            placeholder="Enter prescription"
            multiline
            numberOfLines={4}
            value={formData.prescription}
            onChangeText={(text) => setFormData({ ...formData, prescription: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Patient</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#000000',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  prescriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  placeholder: {
    color: '#9EA0A4',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default PatientManagement;