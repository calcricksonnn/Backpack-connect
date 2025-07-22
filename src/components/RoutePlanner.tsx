import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import polyline from '@mapbox/polyline';
import Constants from 'expo-constants';

const DIRECTIONS_API = 'https://maps.googleapis.com/maps/api/directions/json';

export default function RoutePlanner({ onRouteCalculated }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const plan = async () => {
    const url = `${DIRECTIONS_API}?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${Constants.expoConfig.extra.firebase.mapsApiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.routes.length) {
      const pts = polyline.decode(json.routes[0].overview_polyline.points);
      const coords = pts.map((p: [number, number]) => ({ latitude: p[0], longitude: p[1] }));
      onRouteCalculated(coords);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Start Address" style={styles.input} value={origin} onChangeText={setOrigin}/>
      <TextInput placeholder="End Address" style={styles.input} value={destination} onChangeText={setDestination}/>
      <Button title="Calculate Route" onPress={plan}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:10,
    left:10,
    right:10,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:8,
    elevation:2
  },
  input: {
    borderBottomWidth:1,
    borderColor:'#ccc',
    marginBottom:6,
    padding:4
  }
});