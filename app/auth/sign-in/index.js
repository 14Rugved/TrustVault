import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../configs/firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSignIn = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();
      
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;

      if (!user) {
        throw new Error("Authentication failed.");
      }

      // Check user role in Firestore
      const [receptionistDocs, patientDocs] = await Promise.all([
        getDocs(query(collection(db, "receptionist"), where("email", "==", trimmedEmail))),
        getDocs(query(collection(db, "patient"), where("email", "==", trimmedEmail)))
      ]);

      if (!receptionistDocs.empty) {
        router.replace('Receptionist/ReceptionistPage');
      } else if (!patientDocs.empty) {
        router.replace('tabs/MainPage');
      } else {
        throw new Error("User role not found in database.");
      }

    } catch (error) {
      console.error("Error signing in:", error);
      
      const errorMessages = {
        'auth/invalid-credential': "Invalid email or password. Please check your credentials.",
        'auth/user-not-found': "No user found with this email.",
        'auth/wrong-password': "Incorrect password.",
        'auth/too-many-requests': "Too many failed attempts. Please try again later.",
        'auth/network-request-failed': "Network error. Please check your internet connection."
      };

      setErrorMessage(errorMessages[error.code] || error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Let's Sign You In!</Text>
        <Text style={styles.subheading}>Welcome back!</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity 
            onPress={onSignIn} 
            style={[styles.signInButton, loading && styles.disabledButton]} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.signInButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('auth/sign-up')} 
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    padding: 15,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: "black",
    width: '100%',
    fontSize: 16,
  },
  signInButton: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  createAccountText: {
    color: "blue",
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
