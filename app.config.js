// app.config.js
require('dotenv/config');
const base = require('./app.json.bak').expo;

module.exports = () => ({
  // Base Expo config from app.json
  ...base,

  // ✅ Required to serve modern manifests
  runtimeVersion: '1.0.0',

  // ✅ Merge static extras with env-driven secrets
  extra: {
    ...base.extra,
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
  },

  // ✅ Android config for Google Maps
  android: {
    ...base.android,
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
      }
    }
  },

  // ✅ iOS config for Google Maps
  ios: {
    ...base.ios,
    config: {
      googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
    }
  },

  // ✅ Ensure expo-updates is activated for runtime handling
  plugins: [
    'expo-updates',
    ...(base.plugins || [])
  ]
});