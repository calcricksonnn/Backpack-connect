import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReportModal from './ReportModal';

export default function ChatMessage({ message, myId }) {
  const mine = message.sender === myId;
  const [showRep, setShowRep] = useState(false);

  return (
    <>
      <TouchableOpacity
        onLongPress={() => setShowRep(true)}
        style={[
          styles.bubble,
          mine ? styles.mine : styles.theirs
        ]}>
        <Text style={{ color: mine ? '#fff' : '#000' }}>
          {message.text}
        </Text>
      </TouchableOpacity>
      <ReportModal
        visible={showRep}
        onClose={() => setShowRep(false)}
        targetId={message.id}
        targetType="message"
      />
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding:8,
    marginVertical:4,
    maxWidth:'75%'
  },
  mine: {
    backgroundColor:'#1E90FF',
    alignSelf:'flex-end',
    borderRadius:12
  },
  theirs: {
    backgroundColor:'#eee',
    alignSelf:'flex-start',
    borderRadius:12
  }
});