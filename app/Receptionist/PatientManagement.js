import React, { useState, useEffect } from 'react';
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
import { addPatient, getPatients, updatePatient, deletePatient } from '../services/database';

const PatientManagement = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    disease: '',
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

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPatients();
      setPatients(result);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to load patients. Please try again.');
      Alert.alert('Error', 'Failed to load patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.disease || !formData.cost || !formData.prescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (formData.id) {
        // Update existing patient
        const result = await updatePatient(
          formData.id,
          formData.name,
          formData.email,
          formData.phone
        );
        if (result > 0) {
          Alert.alert('Success', 'Patient updated successfully!');
        } else {
          throw new Error('Failed to update patient');
        }
      } else {
        // Add new patient
        const result = await addPatient(
          formData.name,
          formData.email,
          formData.phone
        );
        if (result) {
          Alert.alert('Success', 'Patient added successfully!');
        } else {
          throw new Error('Failed to add patient');
        }
      }

      // Reset form and refresh patient list
      setFormData({
        id: null,
        name: '',
        email: '',
        phone: '',
        disease: '',
        cost: '',
        prescription: '',
      });
      fetchPatients();
    } catch (error) {
      console.error('Error saving patient:', error);
      setError('Failed to save patient. Please try again.');
      Alert.alert('Error', 'Failed to save patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      setLoading(true);
      const result = await deletePatient(patientId);
      if (result > 0) {
        Alert.alert('Success', 'Patient deleted successfully!');
        fetchPatients();
      } else {
        throw new Error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      Alert.alert('Error', 'Failed to delete patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      disease: '',
      cost: '',
      prescription: '',
    });
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
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Patient Management</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter patient name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Disease</Text>
          <RNPickerSelect
            onValueChange={(value) => setFormData({ ...formData, disease: value })}
            items={pickerItems}
            value={formData.disease}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a disease', value: null }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Cost</Text>
          <TextInput
            style={styles.input}
            value={formData.cost}
            onChangeText={(text) => setFormData({ ...formData, cost: text })}
            placeholder="Enter cost"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Prescription</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.prescription}
            onChangeText={(text) => setFormData({ ...formData, prescription: text })}
            placeholder="Enter prescription"
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
            {loading ? 'Saving...' : formData.id ? 'Update Patient' : 'Add Patient'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.patientsList}>
        <Text style={styles.sectionTitle}>Patients List</Text>
        {patients.map((patient) => (
          <View key={patient.id} style={styles.patientItem}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientDetails}>{patient.email}</Text>
              <Text style={styles.patientDetails}>{patient.phone}</Text>
            </View>
            <View style={styles.patientActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(patient)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(patient.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  patientsList: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 8,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  patientDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  patientActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#2563eb',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
});

export default PatientManagement;