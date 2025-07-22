import React from 'react';
import { Marker } from 'react-native-maps';

export default function UserMarker({ user, onPress }) {
  const { coordinates, email } = user;
  return (
    <Marker
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }}
      title={email}
      onCalloutPress={onPress}
    />
  );
}