module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	env: {
		node: true,
		es2021: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'linebreak-style': 'off',
		camelcase: 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'class-methods-use-this': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/prefer-default-export': 'off',
		'no-plusplus': 'off',
		'no-return-await': 'off',
		'arrow-body-style': 'off',
		'operator-linebreak': 'off',
		'object-curly-newline': 'off',
		
	},
};
