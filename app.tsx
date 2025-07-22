import React from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation';

LogBox.ignoreLogs(['Setting a timer']); // GeoFirestore warning

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}