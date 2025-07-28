// App.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ErrorBoundary from './src/components/ErrorBoundary';

// Static screen option objects
const mapOptions = { title: 'Journey Map' };
const timelineOptions = { title: 'Trip Timeline' };

// Common navigator options
const stackScreenOptions = {
  headerStyle: { backgroundColor: '#fff' },
  headerTintColor: '#333',
};

// Custom theme (extends React Navigation’s DefaultTheme)
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="auto" />

        <ErrorBoundary>
          <NavigationContainer theme={AppTheme}>
            <Stack.Navigator
              initialRouteName="Map"
              screenOptions={stackScreenOptions}
            >
              <Stack.Screen
                name="Map"
                // Lazy-load the Map screen
                getComponent={() =>
                  require('./src/screens/MapScreen').default
                }
                options={mapOptions}
              />

              <Stack.Screen
                name="Timeline"
                // Lazy-load the Timeline screen
                getComponent={() =>
                  require('./src/screens/TripTimelineScreen').default
                }
                options={timelineOptions}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});