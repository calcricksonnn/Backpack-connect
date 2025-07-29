// jest.config.js

module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFiles: [
    'dotenv/config',             // load .env before tests
    '<rootDir>/jest.setup.js'    // custom jest setup
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|react-native|@react-native|@react-navigation|expo-status-bar)/)'
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',                 // support @src alias
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ]
};