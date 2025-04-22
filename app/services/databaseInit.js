import * as SQLite from 'expo-sqlite';

const database = {
  openDatabase: () => {
    return SQLite.openDatabase('trustvault.db');
  }
};

export const initDatabase = () => {
  const db = database.openDatabase();
  
  db.transaction(tx => {
    // Create patients table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        disease TEXT,
        cost REAL,
        prescription TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );

    // Create appointments table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
      )`
    );
  }, error => {
    console.error('Error creating tables:', error);
  }, () => {
    console.log('Database and tables created successfully');
  });

  return db;
};

export const db = initDatabase(); 