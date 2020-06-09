
module.exports = {
  root: true,
  env: {
    "commonjs": true,
    // "es6": true,
    "node": true,
    // "browser":true,
    "jest": true, 
    "mocha": true,
    // "should": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "parser": "babel-eslint"
  },
  "plugins": [
    "eslint-plugin-prettier"
  ],
  extends: [
    "eslint:recommended",
    "eslint-config-prettier", 
  ],
  "rules": {
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ]
  },
  "ignorePatterns": ["temp.js", "node_modules/"],
  
}