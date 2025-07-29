// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Add TypeScript and SVG extensions
  config.resolver.sourceExts = [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'cjs',
    'svg'
  ];

  // Exclude svg from assetExts to prevent double handling
  config.resolver.assetExts = config.resolver.assetExts.filter(
    ext => ext !== 'svg'
  );

  // Alias expo-modules-core to its compiled JS entry
  config.resolver.extraNodeModules = {
    ...(config.resolver.extraNodeModules || {}),
    'expo-modules-core': require.resolve(
      'expo-modules-core/build/index.js'
    )
  };

  // Use the SVG transformer for .svg imports
  config.transformer = {
    ...(config.transformer || {}),
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer'
    )
  };

  return config;
})();