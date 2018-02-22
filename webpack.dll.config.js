const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
var rootPath = path.join(__dirname, "./app/src");
console.log(rootPath + "/assets/less/message.less");
var webpackDll = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		vendor: [
			"babel-polyfill",
			"react",
			"react-router-dom",
			"redux",
			"react-redux",
			"redux-actions",
			"react-router-redux",
			"antd"
		]
	},
	output: {
		path: path.join(__dirname, "/resources/mainfest/"),
		filename: "[name].dll.js",
		library: "[name]_library"
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},

			{
				test: /\.css|less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},

			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: rootPath
			},
			{
				test: /\.(js|jsx|mjs)$/,
				include: /node_modules/,
				loader: require.resolve("babel-loader"),
				options: {
					cacheDirectory: true,
					plugins: [
						["react-html-attrs"],
						["import", { libraryName: "antd", style: "css" }],
						["import", { libraryName: "antd", style: true }]
					]
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/img/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/font/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(
				__dirname,
				"resources/mainfest",
				"[name]-mainfest.json"
			),
			name: "[name]_library"
		})
	]
	// output: {
	// 	path: path.join(__dirname, "js"),
	// 	filename: "MyDll.[name].js",
	// 	library: "[name]_[hash]"
	// },
	// plugins: [
	// 	new webpack.DllPlugin({
	// 		path: path.join(__dirname, "js", "[name]-manifest.json"),
	// 		name: "[name]_[hash]"
	// 	})
	// ]
};
module.exports = webpackDll;
