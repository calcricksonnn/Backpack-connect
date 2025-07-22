import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { reportsRef } from '../firebase';
import { auth } from 'firebase/auth';

export default function ReportModal({ visible, onClose, targetId, targetType }) {
  const [reason, setReason] = useState('');

  const submit = async () => {
    await reportsRef.add({
      reporterId: auth.currentUser.uid,
      targetId,
      targetType,
      reason,
      createdAt: new Date()
    });
    setReason('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Report {targetType}</Text>
          <TextInput
            placeholder="Reason"
            style={styles.input}
            value={reason}
            onChangeText={setReason}
          />
          <Button title="Submit" onPress={submit}/>
          <Button title="Cancel" onPress={onClose}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    width:'80%',
    padding:20,
    backgroundColor:'#fff',
    borderRadius:8
  },
  title: { fontSize:18, marginBottom:10 },
  input: {
    borderWidth:1,
    borderColor:'#ccc',
    padding:8,
    marginBottom:10
  }
});