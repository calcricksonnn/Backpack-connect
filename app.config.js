require("dotenv/config");

if (
  !process.env.API_URL ||
  !process.env.FIREBASE_API_KEY ||
  !process.env.ANDROID_GOOGLE_MAPS_API_KEY ||
  !process.env.IOS_GOOGLE_MAPS_API_KEY
) {
  throw new Error("Missing one or more required .env variables");
}

module.exports = () => ({
  name: "Backpack Connect",
  slug: "backpack-connect",
  version: "1.0.0",
  sdkVersion: "53.0.0",
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
  owner: "calcrickson", // replace with your Expo username if publishing
  extra: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    ENV: process.env.NODE_ENV || "development"
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
    "expo-build-properties",
    [
      "expo-constants",
      {
        extra: {
          ENV: process.env.NODE_ENV || "development"
        }
      }
    ]
  ]
});