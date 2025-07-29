const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Ensure TypeScript files are resolvable
defaultConfig.resolver.sourceExts.push('ts', 'tsx');

module.exports = defaultConfig;