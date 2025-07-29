// app.config.js

// 1. Preload .env into process.env
require('dotenv/config');

module.exports = {
  expo: {
    name: process.env.APP_NAME || "Backpack Connect",
    slug: process.env.APP_SLUG || "backpack-connect",
    version: process.env.APP_VERSION || "1.0.0",
    orientation: "portrait",
    scheme: process.env.EXPO_SCHEME || "backpackconnect",
    platforms: ["ios", "android", "web"],

    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    updates: {
      fallbackToCacheTimeout: 0,
      url: process.env.EAS_UPDATE_URL
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: process.env.ANDROID_PACKAGE
    },

    web: {
      favicon: "./assets/favicon.png"
    },

    extra: {
      // Firebase config
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,

      // EAS
      easProjectId: process.env.EAS_PROJECT_ID
    }
  }
};