import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';

const cfg = Constants.expoConfig.extra.firebase;

const app = initializeApp({
  apiKey: cfg.apiKey,
  authDomain: cfg.authDomain,
  projectId: cfg.projectId,
  storageBucket: cfg.storageBucket,
  messagingSenderId: cfg.messagingSenderId,
  appId: cfg.appId
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const geo = new GeoFirestore(db);

export const usersRef = geo.collection('users');
export const chatsRef = db.collection('chats');
export const eventsRef = db.collection('events');
export const reportsRef = db.collection('reports');
export const pushTokensRef = db.collection('pushTokens');