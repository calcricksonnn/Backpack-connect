import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';
import Profile from '../screens/Profile';
import EventsScreen from '../screens/EventsScreen';
import EventDetails from '../screens/EventDetails';

const Stack = createStackNavigator();

export default function Navigation() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}