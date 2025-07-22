import React, { createContext, useState, useEffect } from 'react';
import { auth, db, pushTokensRef } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string) => Promise<void>;
  signUpPhone: (phone: string) => Promise<void>;
  confirmSMS: (code: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthCtx>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneCred, setPhoneCred] = useState<{ verificationId: string; phone: string } | null>(null);

  useEffect(() =>
    onAuthStateChanged(auth, async u => {
      setUser(u);
      setLoading(false);
      if (u) registerPush(u.uid);
    })
  , []);

  const registerPush = async (uid: string) => {
    if (!Device.isDevice) return;
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const resp = await Notifications.requestPermissionsAsync();
      status = resp.status;
    }
    if (status !== 'granted') return;
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await setDoc(doc(db, 'pushTokens', uid), { token }, { merge: true });
  };

  const signIn = (email: string, pass: string) =>
    signInWithEmailAndPassword(auth, email, pass);

  const signUpEmail = async (email: string, pass: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, 'users', cred.user.uid), {
      email, createdAt: serverTimestamp(), verified: false
    });
  };

  const signUpPhone = async (phone: string) => {
    // You’ll need an ExpoFirebaseRecaptcha component ref here
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(phone, /* recaptchaRef */);
    setPhoneCred({ verificationId, phone });
  };

  const confirmSMS = async (code: string) => {
    if (!phoneCred) return;
    const cred = PhoneAuthProvider.credential(phoneCred.verificationId, code);
    const result = await signInWithCredential(auth, cred);
    await setDoc(doc(db, 'users', result.user.uid), {
      phone: phoneCred.phone,
      createdAt: serverTimestamp(),
      verified: true
    });
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{
      user, loading,
      signIn, signUpEmail, signUpPhone, confirmSMS, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};