// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSOzW4RG7D2UC5fji2TyXdXlnU_UO0X6c",
  authDomain: "predator-c6a7b.firebaseapp.com",
  projectId: "predator-c6a7b",
  storageBucket: "predator-c6a7b.firebasestorage.app",
  messagingSenderId: "495992427799",
  appId: "1:495992427799:web:f451b4955ca96f0520d352",
  measurementId: "G-2XP2RZEECB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance

// Initialize Analytics only in supported environments
let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

// Export auth, db, and analytics for use in other files
export { auth, db, analytics };

// Function to access a Firestore collection
export const getCollectionRef = (collectionName) => {
  return collection(db, collectionName);
};
