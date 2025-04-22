import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HealthCare() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Health Care Documents</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('./ViewPrescriptions')}>
        <Text style={styles.buttonText}>View Prescriptions</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('./ViewDocuments')}>
        <Text style={styles.buttonText}>View Other Documents</Text>
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
  },
  heading: {
    fontSize: width > 600 ? 30 : 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }
});
