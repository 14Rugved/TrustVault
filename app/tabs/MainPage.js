import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../configs/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Header from './Header';
import HorizontalSection from './HorizontalSection';
import DueSection from './DueSection';

const { width } = Dimensions.get('window');

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/');
        return;
      }

      try {
        // Check if user exists in patient collection
        const patientDoc = await getDoc(doc(db, 'patient', user.uid));
        if (!patientDoc.exists()) {
          // If not a patient, check if receptionist
          const receptionistDoc = await getDoc(doc(db, 'receptionist', user.uid));
          if (receptionistDoc.exists()) {
            router.replace('Receptionist/ReceptionistPage');
            return;
          }
          // If neither patient nor receptionist, sign out
          await auth.signOut();
          router.replace('/');
          return;
        }
        
        setUserData(patientDoc.data());
      } catch (error) {
        console.error('Error fetching user data:', error);
        await auth.signOut();
        router.replace('/');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: width > 786 ? '2%' : 0,
      }}
    >
      <ScrollView>
        <Header userData={userData} />
        <DueSection />
        <HorizontalSection />
      </ScrollView>
    </ScrollView>
  );
}