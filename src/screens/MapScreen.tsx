// src/screens/MapScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { auth } from '../firebase';
import { getActiveTrip, createTrip, listenToTrip, addEntry } from '../utils/tripService';
import JourneyMap from '../components/JourneyMap';
import EntryUploader from '../components/EntryUploader';
import TripStats from '../components/TripStats';
import TripExport from '../components/TripExport';

export default function MapScreen() {
  const userId = auth.currentUser!.uid;
  const [tripId, setTripId] = useState<string | null>(null);
  const [tripData, setTripData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      // 1. Request location perms
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Location access is required.');
        return;
      }

      // 2. Get or create active trip
      let active = await getActiveTrip(userId);
      if (!active) {
        active = await createTrip(userId, 'My Journey', new Date());
      }
      setTripId(active.id);

      // 3. Listen for updates
      return listenToTrip(active.id, setTripData);
    })();
  }, []);

  if (!tripData) {
    return <View style={styles.center}><Button title="Loading trip…" disabled /></View>;
  }

  return (
    <View style={styles.container}>
      <JourneyMap
        route={tripData.route}
        entries={tripData.entries}
      />
      <View style={styles.controls}>
        <EntryUploader
          tripId={tripId!}
          onDone={(entry) => addEntry(tripId!, entry)}
        />
        <TripStats trip={tripData} />
        <TripExport trip={tripData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fffccf',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd'
  }
});