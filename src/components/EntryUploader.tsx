// src/components/EntryUploader.tsx
import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

type Props = {
  tripId: string;
  onDone: (entry: any) => void;
};

export default function EntryUploader({ tripId, onDone }: Props) {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const pickPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if (!res.cancelled) setPhoto(res.uri);
  };

  const submit = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    onDone({
      location: { lat: loc.coords.latitude, lng: loc.coords.longitude },
      title: note.slice(0, 20) || 'New Entry',
      note,
      photos: photo ? [photo] : [],
      timestamp: new Date()
    });
    setNote('');
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.preview} />}
      <Button title="Pick Photo" onPress={pickPhoto} />
      <TextInput
        placeholder="Write a note…"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />
      <Button
        title="Add Entry"
        onPress={submit}
        disabled={!note && !photo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  preview: { width: 100, height: 100, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginVertical: 6,
    borderRadius: 4
  }
});