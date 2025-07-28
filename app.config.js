import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  runtimeVersion: '1.0.0',
  extra: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
  },
  android: {
    ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
      }
    }
  },
  ios: {
    ...config.ios,
    config: {
      googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
    }
  }
});