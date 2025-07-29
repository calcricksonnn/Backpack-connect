const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts = [
    'ts', 'tsx', 'js', 'jsx', 'json', 'cjs', 'svg'
  ];

  config.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

  config.resolver.extraNodeModules = {
    'expo-modules-core': require.resolve('expo-modules-core/build/index.js'),
  };

  return config;
})();