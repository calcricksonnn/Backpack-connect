import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function SignUp({ navigation }) {
  const { signUpEmail, signUpPhone, confirmSMS } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [mode, setMode] = useState<'email'|'phone'>('email');

  return (
    <View style={styles.container}>
      {mode === 'email' ? (
        <>
          <Text style={styles.header}>Create Account</Text>
          <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail}/>
          <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword}/>
          <Button title="Sign Up" onPress={async ()=>{try{await signUpEmail(email,password)}catch(e){alert(e.message)}}}/>
          <Text style={styles.link} onPress={()=>setMode('phone')}>Or sign up with phone</Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Phone Verification</Text>
          <TextInput placeholder="+44..." style={styles.input} onChangeText={setPhone}/>
          <Button title="Send Code" onPress={()=>signUpPhone(phone)}/>
          <TextInput placeholder="SMS Code" style={styles.input} onChangeText={setSmsCode}/>
          <Button title="Confirm Code" onPress={()=>confirmSMS(smsCode)}/>
        </>
      )}
      <Text style={styles.link} onPress={()=>navigation.goBack()}>Back to Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  header: { fontSize:24, fontWeight:'700', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginVertical:8, borderRadius:4 },
  link: { color:'#1E90FF', marginTop:12, textAlign:'center' }
});