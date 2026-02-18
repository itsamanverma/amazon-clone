import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Security: Firebase config validation (no logging in production)
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Firebase Environment Check: Config variables loaded');
}

// Validate environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN', 
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
//   console.error('❌ Missing required Firebase environment variables:', missingVars);
  console.error('Please check your .env file and ensure all required variables are set.');
  console.error('Refer to .env.example for the complete list of required variables.');
  console.error('🔄 Try restarting the development server: npm start');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Security: Config validation without logging sensitive data
if (process.env.NODE_ENV === 'development' && !firebaseConfig.apiKey) {
  console.error('⚠️ Firebase configuration incomplete');
}

// Check if API key is valid format
if (!firebaseConfig.apiKey || !firebaseConfig.apiKey.startsWith('AIza')) {
  console.error('🚨 Invalid Firebase API Key format!');
  console.error('Expected format: AIzaSy...');
//   console.error('Received:', firebaseConfig.apiKey || 'undefined');
  console.error('💡 Solution: Check .env file and restart development server');
}

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };