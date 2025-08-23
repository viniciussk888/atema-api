module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.scafflater/*",
    "<rootDir>/dist/",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.scafflater/*",
    "<rootDir>/dist/",
  ],
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"],
  coveragePathIgnorePatterns: ["index.ts"],
};
