const config = {
  verbose: true,
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/',
    '^@components(.*)$': '<rootDir>/src',
    '^@constants(.*)$': '<rootDir>/src',
    '^@features(.*)$': '<rootDir>/src',
    '^@layouts(.*)$': '<rootDir>/src',
    '^@pages(.*)$': '<rootDir>/src',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
};

module.exports = config;
