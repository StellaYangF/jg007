module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  reporters: ["default", "jest-junit"],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  transform: {
      '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif||svg|ttf|woff|woff2)$":
          "<rootDir>/test/__mocks__/file-mock.js",
      "\\.(css|less|sass|scss)$":
          "<rootDir>/test/__mocks__/object-mock.js"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.tsx']
}