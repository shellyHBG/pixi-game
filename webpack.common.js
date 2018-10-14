const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/app.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: `${__dirname}/dist`,
	},
    externals: {
        "pixi.js": "PIXI"
    },
	module: {
		rules: [
			//  JavaScript Loader
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			//  CSS Loader
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			//  Images Loader
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/images/'
						}
					}
				],
			},
			//  Fonts Loader
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/fonts/'
						}
					}
				],
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([
			{from: './src/assets/**/*', to: './assets/', flatten: true}
		])
	]
};
