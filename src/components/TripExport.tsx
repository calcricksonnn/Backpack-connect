// src/components/TripExport.tsx
import React from 'react';
import { Button, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Trip } from '../utils/tripService';

type Props = { trip: Trip };

export default function TripExport({ trip }: Props) {
  const exportJSON = async () => {
    const uri = FileSystem.documentDirectory! + `${trip.id}.json`;
    await FileSystem.writeAsStringAsync(uri, JSON.stringify(trip, null, 2));
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing not available on this device');
      return;
    }
    await Sharing.shareAsync(uri);
  };

  return <Button title="Export Trip" onPress={exportJSON} />;
}