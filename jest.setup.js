// jest.setup.js

import 'react-native-gesture-handler/jestSetup';

// Silence Animated useNativeDriver warning
jest.mock(
  'react-native/Libraries/Animated/NativeAnimatedHelper'
);

// Mock Reanimated 2
jest.mock(
  'react-native-reanimated',
  () => require('react-native-reanimated/mock')
);