import * as SQLite from 'expo-sqlite';

// Initialize the database
const db = SQLite.openDatabase('trustvault.db');

// Initialize tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create appointments table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER,
          date TEXT,
          time TEXT,
          reason TEXT,
          status TEXT DEFAULT 'scheduled',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        [],
        () => {
          // Create patients table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS patients (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              email TEXT,
              phone TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
            [],
            () => {
              console.log('Database initialized successfully');
              resolve();
            },
            (_, error) => {
              console.error('Error creating patients table:', error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error('Error creating appointments table:', error);
          reject(error);
        }
      );
    });
  });
};

// Initialize the database when the module is loaded
initDatabase().catch(error => {
  console.error('Error initializing database:', error);
});

export const getAppointments = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appointments ORDER BY date, time',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const addAppointment = async (patientId, date, time, reason) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO appointments (patient_id, date, time, reason) VALUES (?, ?, ?, ?)',
        [patientId, date, time, reason],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteAppointment = async (appointmentId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM appointments WHERE id = ?',
        [appointmentId],
        (_, { rowsAffected }) => resolve(rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

export const getPatients = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM patients ORDER BY name',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const addPatient = async (name, email, phone) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO patients (name, email, phone) VALUES (?, ?, ?)',
        [name, email, phone],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
}; 