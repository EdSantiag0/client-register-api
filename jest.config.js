export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
};
