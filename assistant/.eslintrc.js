module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'xo'],
	overrides: [
		{
			extends: ['xo-typescript'],
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/naming-convention': 'off',
				'max-params': ['error', 8],
				'@typescript-eslint/object-curly-spacing': ['error', 'always'],
				'no-unsafe-assignment': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	plugins: ['react'],
	rules: {
		'jsx-quotes': ['error', 'prefer-double'],
		'arrow-parens': ['error', 'always'],
		'react/react-in-jsx-scope': 'off',
		complexity: ['off', 20],
		'new-cap': 'off',
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
		'no-unsafe-assignment': 'off',
	},
};
