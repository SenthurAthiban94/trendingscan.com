const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
	{
        mode: "development",
		name: 'client',
		target: 'web',
        entry: './app/client/client.js',
		output: {
			path: path.join(__dirname, 'build'),
			filename: 'client.js',
			publicPath: '/build/',
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{ 
					test: /\.css$/, 
					use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) 
				},
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
				{
					test: /\.(png|ico|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					loader: 'file-loader?name=[name].[ext]',
				}
			],
		},
		plugins:[
			new ExtractTextPlugin('styles.css')
		]
	},
	{
        mode : "development",
		name: 'server',
		target: 'node',
        entry: './app/server/server.js',
        output: {
			path: path.join(__dirname, 'build'),
			filename: 'server.js',
			libraryTarget: 'commonjs2',
			publicPath: '/build/',
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{ 
					test: /\.css$/, 
					use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }) 
				},
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'isomorphic-style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
				{
					test: /\.(png|ico|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					loader: 'file-loader?name=[name].[ext]',
				}
			],
		},
		plugins:[
			new ExtractTextPlugin('styles.css')
		]
	}
];