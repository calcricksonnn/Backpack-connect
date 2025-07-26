// src/screens/TripTimelineScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { getActiveTrip, listenToTrip } from '../utils/tripService';

export default function TripTimelineScreen() {
  const userId = auth.currentUser!.uid;
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const active = await getActiveTrip(userId);
      if (active) listenToTrip(active.id, setTrip);
    })();
  }, []);

  if (!trip) return <View style={styles.center}><Text>Loading…</Text></View>;

  return (
    <FlatList
      data={trip.entries.sort((a: any, b: any) =>
        b.timestamp.toMillis() - a.timestamp.toMillis()
      )}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.photos[0] && (
            <Image source={{ uri: item.photos[0] }} style={styles.photo} />
          )}
          <Text style={styles.date}>
            {item.timestamp.toDate().toLocaleString()}
          </Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.note}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 12,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2
  },
  photo: { width: '100%', height: 200, borderRadius: 6, marginBottom: 8 },
  date: { fontSize: 12, color: '#666', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 }
});