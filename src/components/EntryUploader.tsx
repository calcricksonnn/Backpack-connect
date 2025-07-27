import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { addEntry } from '../services/tripService';

interface EntryUploaderProps {
  tripId: string | null;
}

export default function EntryUploader({ tripId }: EntryUploaderProps) {
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickFromLibrary = async () => {
    const { status: libStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: camStatus } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (libStatus !== 'granted' || camStatus !== 'granted') {
      Alert.alert(
        'Permissions required',
        'Camera and photo library permissions are required.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Camera permission is required to take photos.'
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const upload = async () => {
    if (!tripId) {
      Alert.alert('No active trip', 'Please start a trip first.');
      return;
    }
    try {
      await addEntry(tripId, { imageUri, note });
      setImageUri(null);
      setNote('');
      Alert.alert('Success', 'Entry added to your trip.');
    } catch (e) {
      console.error(e);
      Alert.alert('Upload failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Library" onPress={pickFromLibrary} />
        <Button title="Camera" onPress={takePhoto} />
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Add a note"
        value={note}
        onChangeText={setNote}
      />

      <Button
        title="Upload"
        onPress={upload}
        disabled={!imageUri && note.trim().length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: 180,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});