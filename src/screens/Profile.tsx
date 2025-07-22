import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [avatar, setAvatar] = useState<string|null>(null);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      setAvatar(snap.data()?.avatar || null);
    })();
  }, []);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality:0.7 });
    if (!res.cancelled) {
      await updateDoc(doc(db, 'users', user.uid), { avatar: res.uri });
      setAvatar(res.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar}/>
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.email}>{user.email || user.phoneNumber}</Text>
      <Button title="Log Out" onPress={logout} color="#FF6347"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', padding:20 },
  avatar: { width:120, height:120, borderRadius:60, marginBottom:20 },
  placeholder: { backgroundColor:'#ccc', justifyContent:'center', alignItems:'center' },
  email: { fontSize:18, marginBottom:20 }
});