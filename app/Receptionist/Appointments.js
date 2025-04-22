import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AddAppointment from './AddAppointment';
import AppointmentInfo from './AppointmentInfo';
import Search from './Search';
import { getAppointments, deleteAppointment } from '../services/database';

function Appointments() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [orderBy, setOrderBy] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAppointments();
      setAppointmentList(result);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again.");
      Alert.alert("Error", "Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const result = await deleteAppointment(appointmentId);
      if (result > 0) {
        setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId));
        Alert.alert("Success", "Appointment deleted successfully");
      } else {
        Alert.alert("Error", "Appointment not found");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      Alert.alert("Error", "Failed to delete appointment. Please try again.");
    }
  };

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.patient_name?.toLowerCase().includes(query.toLowerCase()) ||
        item.reason?.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy] < b[sortBy] ? -1 * order : 1 * order;
    });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading appointments...</Text>
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="calendar" size={24} color="#2563eb" style={styles.icon} />
          <Text style={styles.title}>Appointments</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <AddAppointment onSendAppointment={fetchAppointments} />
        
        <Search
          query={query}
          onQueryChange={setQuery}
          orderBy={orderBy}
          onOrderByChange={setOrderBy}
          sortBy={sortBy}
          onSortBYChange={setSortBy}
        />
        
        <View style={styles.appointmentsList}>
          {filteredAppointments.length === 0 ? (
            <Text style={styles.noAppointmentsText}>No appointments found</Text>
          ) : (
            filteredAppointments.map((appointment) => (
              <AppointmentInfo
                key={appointment.id}
                appointment={appointment}
                onDeleteAppointment={handleDeleteAppointment}
              />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  appointmentsList: {
    flex: 1,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  noAppointmentsText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 16,
  },
});

export default Appointments; 