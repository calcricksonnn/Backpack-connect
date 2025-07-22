import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { eventsRef } from '../firebase';
import { onSnapshot } from 'firebase/firestore';

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(eventsRef, snap => {
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={e => e.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Button title="Details" onPress={() => navigation.navigate('EventDetails', { event: item })}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  card: {
    backgroundColor:'#fff',
    padding:16,
    borderRadius:8,
    marginBottom:12,
    elevation:2
  },
  title: { fontSize:18, fontWeight:'600', marginBottom:8 }
});