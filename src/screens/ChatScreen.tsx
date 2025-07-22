import React, { useState, useEffect } from 'react';
import {
  View, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView
} from 'react-native';
import { auth, db } from '../firebase';
import { doc, collection, orderBy, query, onSnapshot, addDoc } from 'firebase/firestore';
import ChatMessage from '../components/ChatMessage';

export default function ChatScreen({ route }) {
  const { peerId } = route.params;
  const current = auth.currentUser.uid;
  const chatId = [current, peerId].sort().join('_');
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(doc(db, 'chats', chatId), 'messages'), orderBy('createdAt'));
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    await addDoc(collection(doc(db, 'chats', chatId), 'messages'), {
      sender: current,
      text,
      createdAt: new Date()
    });
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        data={messages}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <ChatMessage message={item} myId={current} />}
        contentContainerStyle={{ padding:16 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={send} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1 },
  inputRow: {
    flexDirection:'row',
    padding:8,
    borderTopWidth:1,
    borderColor:'#ddd'
  },
  input: {
    flex:1, borderWidth:1, borderColor:'#ccc',
    borderRadius:4, padding:8, marginRight:8
  }
});