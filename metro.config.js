// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts = [
    'ts', 'tsx', 'js', 'jsx', 'json', 'cjs'
  ];

  return config;
})();