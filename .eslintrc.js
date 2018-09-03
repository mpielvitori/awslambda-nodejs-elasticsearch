module.exports = {
    parser: 'babel-eslint',
    plugins: [
        "jest",
    ],
    env: {
        node: true,
        "jest/globals": true,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    globals: {},
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            spread: true,
            experimentalObjectRestSpread: true,
        }
    },
    rules: {
        "padded-blocks": 0,
        "no-constant-condition": 0,
        "new-cap": [2, {
            "capIsNewExceptions": [
                "Client",
            ],
        }],
    }
};
