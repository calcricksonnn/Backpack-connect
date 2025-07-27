// app.tsx

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import MapScreen from './src/screens/MapScreen';
import TripTimelineScreen from './src/screens/TripTimelineScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Map">
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ title: 'Journey Map' }}
            />
            <Stack.Screen
              name="Timeline"
              component={TripTimelineScreen}
              options={{ title: 'Trip Timeline' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}