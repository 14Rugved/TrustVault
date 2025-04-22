import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import SetReminder from './SetReminder';
const { width } = Dimensions.get('window');

export default function ViewPrescriptions() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [templateDocs, setTemplateDocs] = useState([]);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const context = require.context('../../templates', false, /\.json$/);
        const templates = context.keys().map(context);
        setTemplateDocs(templates);
      } catch (error) {
        console.error("Error loading templates:", error);
        setTemplateDocs([]);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleSetReminder = (item) => {
    router.push({ pathname: './SetReminder', params: { document: JSON.stringify(item) } });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Health Care Documents</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : templateDocs.length > 0 ? (
        <FlatList
          data={templateDocs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.docItem}>
              <Text style={styles.modalText}>👤 Patient: {item.patientName}</Text>
              <Text style={styles.modalText}>🩺 Doctor: {item.doctorName}</Text>
              <Text style={styles.modalText}>💊 Medication: {item.medication}</Text>
              <Text style={styles.modalText}>📅 Follow-up: {item.followUpDate}</Text>
              {item.notes ? <Text style={styles.modalText}>📝 Notes: {item.notes}</Text> : null}
              <TouchableOpacity style={styles.reminderButton} onPress={() => handleSetReminder(item)}>
                <Text style={styles.reminderButtonText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.modalText}>No documents available</Text>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: width > 786 ? 60 : 10,
    marginBottom: width > 786 ? 0 : 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginRight: 20,
  },
  heading: {
    fontSize: width > 600 ? 30 : 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: width > 786 ? 10 : 40,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  docItem: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    marginVertical: 5,
    width: "90%",
    borderRadius: 5,
    alignItems: "flex-start",
  },
  reminderButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#000000",
    borderRadius: 5,
    alignItems: "center",
  },
  reminderButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
