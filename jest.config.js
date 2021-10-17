//const defineProperty = Object.defineProperty;
//Object.defineProperty = (o, p, c) => defineProperty(o, p, Object.assign({}, c ?? {}, { configurable: true }));

module.exports = {
    "roots": [
      "<rootDir>/src",
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },    

    "globals": {
      "ts-jest": {
        "compiler": "ttypescript"
      }
    },
    "setupFiles": [
      "<rootDir>/config.ts"
    ]
    
  }