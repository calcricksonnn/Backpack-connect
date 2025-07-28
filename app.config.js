// app.config.js
require('dotenv/config');
const base = require('./app.json.bak').expo;

module.exports = () => ({
  // 1. Copy everything from app.json
  ...base,

  // 2. Explicit runtime version
  runtimeVersion: '1.0.0',

  // 3. Merge extras: static + env
  extra: {
    ...base.extra,
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
  },

  // 4. Android: Google Maps API key
  android: {
    ...base.android,
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
      }
    }
  },

  // 5. iOS: Google Maps API key
  ios: {
    ...base.ios,
    config: {
      googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
      // you can also merge other iOS-specific overrides here
    }
  },

  // 6. Ensure expo-updates plugin is applied first
  plugins: [
    'expo-updates',
    ...(base.plugins || [])
  ]
});