// src/firebase.ts
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const cfg = Constants.manifest?.extra;
if (!cfg) throw new Error('Missing Firebase config in app.json');

const firebaseConfig = {
  apiKey: cfg.FIREBASE_API_KEY,
  authDomain: cfg.FIREBASE_AUTH_DOMAIN,
  projectId: cfg.FIREBASE_PROJECT_ID,
  storageBucket: cfg.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: cfg.FIREBASE_MESSAGING_SENDER_ID,
  appId: cfg.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);