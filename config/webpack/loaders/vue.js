module.exports = {
	test: /\.vue(\.erb)?$/,
	use: [
		{
			loader: 'vue-loader',
			options: {
				loaders: {
					// you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
					i18n: '@kazupon/vue-i18n-loader',
				},
			},
		},
	],
}
