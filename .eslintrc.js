module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true
  },
  "rules": {
    "block-spacing": 2,
    "camelcase": 2,
    "curly": 2,
    "eqeqeq": 2,
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "keyword-spacing": 2,
    "no-undef": 2,
    "no-unused-expressions": 2,
    "no-unused-vars": 2,
    "no-use-before-define": [
      2,
      {
        "functions": false
      }
    ],
    "quotes": [
      2,
      "single"
    ],
    "semi": 2,
    "space-in-parens": [
      2,
      "never"
    ],
    "space-infix-ops": 2,
    "strict": [
      2,
      "function"
    ],
    "wrap-iife": [
      2,
      "any"
    ]
  }
};