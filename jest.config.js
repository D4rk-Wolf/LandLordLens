/**
 * Jest configuration for unit tests
 */

module.exports = {
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['**/tests/server/**/*.test.js', '**/tests/lib/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/screens/**/*.test.tsx', '**/tests/components/**/*.test.tsx'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
      transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
      },
      moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '\\.(css|less|scss|sass)$': '<rootDir>/tests/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/fileMock.js',
      },
      transformIgnorePatterns: [
        'node_modules/(?!(react-native|react-native-web|@react-native|@react-navigation)/)',
      ],
    },
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'server/**/*.js',
    'lib/**/*.js',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 10000,
};
