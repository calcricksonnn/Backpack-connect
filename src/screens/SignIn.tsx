import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function SignIn({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Sign In"
        onPress={async () => {
          try { await signIn(email, password); }
          catch (e) { alert(e.message); }
        }}
      />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  header: { fontSize:24, fontWeight:'700', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginVertical:8, borderRadius:4 },
  link: { color:'#1E90FF', marginTop:12, textAlign:'center' }
});