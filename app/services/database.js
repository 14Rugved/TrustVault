import { db } from './databaseInit';

// Helper function to execute SQL queries with proper error handling
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          params,
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

export const getAppointments = async () => {
  try {
    const result = await executeQuery(
      'SELECT a.*, p.name as patient_name FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id ORDER BY a.date, a.time'
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const addAppointment = async (patientId, date, time, reason) => {
  try {
    const result = await executeQuery(
      'INSERT INTO appointments (patient_id, date, time, reason) VALUES (?, ?, ?, ?)',
      [patientId, date, time, reason]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const result = await executeQuery(
      'DELETE FROM appointments WHERE id = ?',
      [appointmentId]
    );
    return result.rowsAffected;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const getPatients = async () => {
  try {
    const result = await executeQuery(
      'SELECT * FROM patients ORDER BY name'
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatientById = async (patientId) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM patients WHERE id = ?',
      [patientId]
    );
    return result.rows._array[0];
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

export const addPatient = async (name, email, phone, disease = null, cost = null, prescription = null) => {
  try {
    const result = await executeQuery(
      'INSERT INTO patients (name, email, phone, disease, cost, prescription) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, disease, cost, prescription]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (patientId, name, email, phone, disease = null, cost = null, prescription = null) => {
  try {
    const result = await executeQuery(
      'UPDATE patients SET name = ?, email = ?, phone = ?, disease = ?, cost = ?, prescription = ? WHERE id = ?',
      [name, email, phone, disease, cost, prescription, patientId]
    );
    return result.rowsAffected;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const deletePatient = async (patientId) => {
  try {
    const result = await executeQuery(
      'DELETE FROM patients WHERE id = ?',
      [patientId]
    );
    return result.rowsAffected;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};

export const searchPatients = async (query) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM patients WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? ORDER BY name',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error searching patients:', error);
    throw error;
  }
};