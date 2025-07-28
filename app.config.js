require('dotenv/config');

module.exports = () => ({
  name: "Backpack Connect",
  slug: "backpack-connect",
  version: "1.0.0",
  sdkVersion: "50.0.0",
  platforms: ["ios", "android"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ["**/*"],
  runtimeVersion: "1.0.0",
  extra: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
      }
    }
  },
  ios: {
    config: {
      googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
    }
  },
  plugins: [
    "expo-updates",
    "expo-build-properties"
  ]
});