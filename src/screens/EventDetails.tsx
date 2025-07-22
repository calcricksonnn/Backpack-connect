import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function EventDetails({ route, navigation }) {
  const { event } = route.params;

  const rsvp = async () => {
    const ref = doc(db, 'events', event.id);
    await updateDoc(ref, {
      attendees: event.attendees ? [...event.attendees, auth.currentUser.uid] : [auth.currentUser.uid]
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Button title="RSVP" onPress={rsvp}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  header: { fontSize:24, fontWeight:'700', marginBottom:12 }
});