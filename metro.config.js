// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // 🔍 Ensure Metro can resolve these file types
  config.resolver.sourceExts = [
    'ts', 'tsx', 'js', 'jsx', 'json', 'cjs', 'svg'
  ];

  // 📦 Enable support for SVG assets and apply custom transformer
  config.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  // 🧼 Remove svg from assetExts to prevent double-handling
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

  return config;
})();