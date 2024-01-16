module.exports = {
  // Specifies the Jest preset - this line sets up Jest to correctly handle TypeScript
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      // Use this to configure ts-jest
      // For example, to use a specific version of TypeScript
      tsconfig: 'tsconfig.json'
    }
  },

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The regexp pattern Jest uses to detect test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },
};
