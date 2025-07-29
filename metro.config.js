// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Enable TypeScript and SVG support
  config.resolver.sourceExts = [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'svg'
  ];

  // Prevent Metro from double-handling SVGs
  config.resolver.assetExts = config.resolver.assetExts.filter(
    ext => ext !== 'svg'
  );

  // Use react-native-svg-transformer for .svg imports
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  };

  return config;
})();