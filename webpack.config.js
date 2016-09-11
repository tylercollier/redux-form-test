const webpack = require('webpack')

module.exports = {
	entry: {
		app: './app/index.js'
	},
	module: {
		loaders: [
			{ pattern: /\.jsx?/, loader: 'babel', exclude: /node_modules/ }
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin({ })],
	devServer: {
		historyApiFallback: true,
		hot: true,
		stats: {
			colors: true,
			chunks: false
		}
	},
}