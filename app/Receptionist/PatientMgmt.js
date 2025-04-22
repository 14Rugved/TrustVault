import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Dummy Data
const patients = [
  { name: "John Smith", contact: "+1234567890", lastAppointment: "Oct 15, 2023" },
  { name: "Emily Brown", contact: "+9876543210", lastAppointment: "Sep 30, 2023" },
  { name: "Lisa Green", contact: "+9876543210", lastAppointment: "Sep 30, 2023" },
];

const PatientMgmt = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient Management</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        placeholder="Search patients" 
        style={styles.searchBox} 
        placeholderTextColor="#666"
      />

      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.patientList}>
        {patients.map((patient, index) => (
          <View key={index} style={styles.patientCard}>
            <Text style={styles.patientName}>{patient.name}</Text>
            {patient.contact && <Text style={styles.patientInfo}>Contact: {patient.contact}</Text>}
            {patient.lastAppointment && <Text style={styles.patientInfo}>Last Appointment: {patient.lastAppointment}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.receiptButton} 
                onPress={() => router.push('../Receptionist/FormTemplate')}
              >
                <Text style={styles.receiptText}>Prescription</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.receiptButton}>
                <Text style={styles.receiptText}>Receipts</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/ReceptionistPage")}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  logoutText: {
    color: "white",
  },
  searchBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
    color: "black",
  },
  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sortButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  patientList: {
    flex: 1,
  },
  patientCard: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  patientName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  patientInfo: {
    color: "#ccc",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  receiptButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  receiptText: {
    color: "black",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});

export default PatientMgmt;
