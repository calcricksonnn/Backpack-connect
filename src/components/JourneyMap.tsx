// src/components/JourneyMap.tsx
import React from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';

type Props = {
  route: { lat: number; lng: number }[];
  entries: {
    location: { lat: number; lng: number };
    title: string;
    note: string;
  }[];
};

export default function JourneyMap({ route, entries }: Props) {
  if (!route.length) return <View style={styles.empty} />;
  const initial = route[0];
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: initial.lat,
        longitude: initial.lng,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8
      }}
    >
      <Polyline
        coordinates={route.map(p => ({ latitude: p.lat, longitude: p.lng }))}
        strokeColor="#00ADEF"
        strokeWidth={4}
      />
      {entries.map((e, i) => (
        <Marker
          key={i}
          coordinate={{
            latitude: e.location.lat,
            longitude: e.location.lng
          }}
          title={e.title}
          description={e.note}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 120
  },
  empty: { flex: 1, backgroundColor: '#eef' }
});