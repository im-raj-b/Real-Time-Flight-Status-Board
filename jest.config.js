export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Explicitly set the test environment
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
};
