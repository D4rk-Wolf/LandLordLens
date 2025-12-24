module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/react-in-jsx-scope': 'off', // Not needed for React 17+
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn', // Allow any but warn
        'react/prop-types': 'off', // Using TS for props
        '@typescript-eslint/ban-ts-comment': 'warn',
        'react/no-unknown-property': ['error', { ignore: ['class', 'for'] }], // For avoiding class/className confusion but being strict
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['dist/', 'node_modules/', 'build/', '*.js'],
};
