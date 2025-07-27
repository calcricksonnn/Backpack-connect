import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import * as Location from 'expo-location';

import EntryUploader from '../components/EntryUploader';
import TripStats from '../components/TripStats';
import TripExport from '../components/TripExport';
import { getActiveTrip, listenToTripEntries } from '../services/tripService';

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [markers, setMarkers] = useState<
    { id: string; latitude: number; longitude: number }[]
  >([]);
  const [routeCoords, setRouteCoords] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [tripId, setTripId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Location permission is required to record your journey.'
        );
        return;
      }

      // Center map on current position
      const { coords } = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Load or create active trip, then listen for new entries
      const trip = await getActiveTrip();
      if (trip) {
        setTripId(trip.id);
        listenToTripEntries(trip.id, (entries) => {
          // Update markers and polyline
          const m = entries.map((e) => ({
            id: e.id,
            latitude: e.location.latitude,
            longitude: e.location.longitude,
          }));
          setMarkers(m);
          setRouteCoords(
            m.map((pt) => ({ latitude: pt.latitude, longitude: pt.longitude }))
          );
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
          {markers.map((m) => (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            />
          ))}

          {routeCoords.length > 1 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor="#007AFF"
            />
          )}
        </MapView>
      )}

      <EntryUploader tripId={tripId} />

      {tripId && (
        <>
          <TripStats tripId={tripId} />
          <TripExport tripId={tripId} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});