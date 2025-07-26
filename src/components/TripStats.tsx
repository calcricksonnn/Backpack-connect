// src/components/TripStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trip } from '../utils/tripService';

type Props = { trip: Trip };

export default function TripStats({ trip }: Props) {
  const count = trip.entries.length;
  const dist = trip.route.reduce((sum, p, i, arr) => {
    if (i === 0) return 0;
    const prev = arr[i - 1];
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(p.lat - prev.lat);
    const dLon = toRad(p.lng - prev.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(prev.lat)) *
        Math.cos(toRad(p.lat)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return sum + R * c;
  }, 0);

  return (
    <View style={styles.container}>
      <Text>Entries: {count}</Text>
      <Text>Distance: {dist.toFixed(1)} km</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 6 }
});