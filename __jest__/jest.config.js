module.exports = {
  roots: ["../__tests__", "../src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Modules are meant for code which is repeating in each test file
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["../node_modules", "../src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/filesMock.js",
    // Path aliases (kept in sync with tsconfig.json / babel.config.js)
    "^@assets/(.*)$": "<rootDir>/../src/assets/$1",
    "^@components/(.*)$": "<rootDir>/../src/components/$1",
    "^@core/(.*)$": "<rootDir>/../src/core/$1",
    "^@layout/(.*)$": "<rootDir>/../src/layout/$1",
    "^@pages/(.*)$": "<rootDir>/../src/pages/$1",
    "^@routes/(.*)$": "<rootDir>/../src/routes/$1",
    "^@types/(.*)$": "<rootDir>/../src/types/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        // isolatedModules берётся из tsconfig.json (там включён)
        diagnostics: { ignoreCodes: [151001] },
      },
    ],
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform", // To work with CSS like modules
  },
  testMatch: ["**/?(*.)(spec|test).[jt]s?(x)"], // Finds test files named like abc.test|spec.ts?tsx|js|jsx in roots:[] prop.
  testEnvironment: "jsdom", // To avoid of js DOM errors
};
