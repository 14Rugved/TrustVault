import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  const fetchAppointments = useCallback(async () => {
    try {
      const result = await getAppointments();
      setAppointmentList(result.rows._array);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.patient_name.toLowerCase().includes(query.toLowerCase()) ||
        item.reason.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy] < b[sortBy] ? -1 * order : 1 * order;
    });

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
          {filteredAppointments.map((appointment) => (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  header: {
    marginBottom: 16,
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
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  appointmentsList: {
    marginTop: 16,
  },
});

export default Appointments; 