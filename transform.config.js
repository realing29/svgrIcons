export const transformConfig = {
	plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
	replaceAttrValues: {
		'#0F172A': 'currentColor',
		none: 'none',
	},
	// svgProps: { fill: 'currentColor' },
	expandProps: 'end',
	jsxRuntime: 'automatic',
	exportType: 'named',
	prettier: true,
	prettierConfig: {
		printWidth: 120,
		singleQuote: false,
		trailingComma: 'all',
		bracketSpacing: true,
		bracketSameLine: false,
		tabWidth: 4,
		semi: false,
		useTabs: true,
		arrowParens: 'always',
		endOfLine: 'auto',
		importOrder: [
			'^next/(.*)$',
			'^widgets/(.*)$',
			'^feature/(.*)$',
			'^entities/(.*)$',
			'^shared/(.*)$',
			'^.ui/(.*)$',
			'^./(.*)$',
			'^assets/images/(.*)$',
			'^assets/style/(.*)$',
			'^[./]',
		],
		importOrderSeparation: true,
		importOrderSortSpecifiers: true,
	},
	svgoConfig: {
		plugins: [
			{
				name: 'removeViewBox',
				active: false,
			},
			{
				name: 'handleXmlnsXodm',
				type: 'full',
				params: {},
				fn: (ast) => {
					delete ast.children[3].attributes['xmlns:xodm']
					return ast
				},
			},
		],
	},

	// ref: false,
}
