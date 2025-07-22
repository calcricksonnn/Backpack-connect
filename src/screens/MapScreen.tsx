import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { auth, usersRef, db } from '../firebase';
import UserMarker from '../components/UserMarker';
import RoutePlanner from '../components/RoutePlanner';
import { serverTimestamp } from 'firebase/firestore';

export default function MapScreen({ navigation }) {
  const [region, setRegion] = useState(null);
  const [nearby, setNearby] = useState<any[]>([]);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const { coords } = await Location.getCurrentPositionAsync();
      const center = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      };
      setRegion(center);

      // Save user location
      const uid = auth.currentUser.uid;
      await usersRef.doc(uid).set({
        coordinates: new (require('firebase/firestore')).GeoPoint(coords.latitude, coords.longitude),
        email: auth.currentUser.email
      });

      // Subscribe to nearby
      const sub = usersRef
        .near({ center: new (require('firebase/firestore')).GeoPoint(coords.latitude, coords.longitude), radius: 5 })
        .subscribe(snap => {
          const others = snap.docs
            .filter(d => d.id !== uid)
            .map(d => ({ id: d.id, ...d.data() }));
          setNearby(others);
        });
      return () => sub.unsubscribe();
    })();
  }, []);

  const triggerSOS = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
    const contacts = userDoc.data().emergencyContacts || [];
    await db.collection('sos').doc(auth.currentUser.uid).set({
      coords: { lat: coords.latitude, lng: coords.longitude },
      contacts,
      ts: serverTimestamp()
    });
    alert('SOS sent');
  };

  const onRoute = coords => setRouteCoords(coords);

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
          {nearby.map(u => (
            <UserMarker
              key={u.id}
              user={u}
              onPress={() => navigation.navigate('Chat', { peerId: u.id })}
            />
          ))}
          {routeCoords.length > 1 && (
            <Polyline coordinates={routeCoords} strokeColor="#1E90FF" strokeWidth={4} />
          )}
        </MapView>
      )}
      <RoutePlanner onRouteCalculated={onRoute} />
      <TouchableOpacity style={styles.sos} onPress={triggerSOS}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Events')}>
        <Text>Events</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1 },
  map: { flex:1 },
  sos: {
    position:'absolute', bottom:80, right:20,
    backgroundColor:'#FF4444', padding:16, borderRadius:32
  },
  sosText: { color:'#fff', fontWeight:'bold' },
  btn: {
    position:'absolute', bottom:20, right:20,
    backgroundColor:'#fff', padding:10, borderRadius:8, marginTop:8
  }
});