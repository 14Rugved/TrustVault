import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AppointmentInfo({ appointment, onDeleteAppointment }) {
  const formatDateTime = (date, time) => {
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `${formattedDate} at ${time}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onDeleteAppointment(appointment.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.nameTimeContainer}>
            <Text style={styles.patientName}>
              {appointment.patient_name}
            </Text>
            <Text style={styles.dateTime}>
              {formatDateTime(appointment.date, appointment.time)}
            </Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Email:</Text>{" "}
              {appointment.patient_email}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Phone:</Text>{" "}
              {appointment.patient_phone}
            </Text>
          </View>
          
          {appointment.reason && (
            <View style={styles.reasonContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Reason:</Text>{" "}
                {appointment.reason}
              </Text>
            </View>
          )}
          
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge,
              appointment.status === 'scheduled' ? styles.statusScheduled :
              appointment.status === 'completed' ? styles.statusCompleted :
              styles.statusPending
            ]}>
              <Text style={styles.statusText}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  dateTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailsContainer: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#111827',
  },
  reasonContainer: {
    marginBottom: 8,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusScheduled: {
    backgroundColor: '#dcfce7',
  },
  statusCompleted: {
    backgroundColor: '#dbeafe',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default AppointmentInfo; 