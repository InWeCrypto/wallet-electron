var webpack = require("webpack");
var fs = require("fs");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const uglify = require("uglifyjs-webpack-plugin");
var path = require("path");
var entries = {};
var rootPath = path.resolve(__dirname, "../app/src");

entries.app = [rootPath + "/index.js", rootPath + "/assets/less/common.less"];
entries.pace = [
	rootPath + "/assets/less/pace.theme.less",
	rootPath + "/assets/js/pace.js"
];
entries.message = [
	rootPath + "/assets/less/message.less",
	rootPath + "/assets/js/message.js"
];
var webpackConfig = {
	entry: entries,
	resolve: {
		extensions: [".web.js", ".mjs", ".js", ".json", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "../app/src/components"),
			"#": path.resolve(__dirname, "../app/src/assets/images")
		}
	},
	node: {
		fs: "empty"
	},
	devtool: "cheap-module-source-map",
	devServer: {
		historyApiFallback: true,
		host: "localhost",
		open: false
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: rootPath
			},
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},
			{
				test: /\.css|less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "less-loader"]
				})
			},
			//css模块化 暂时不开放使用工作量太大
			// {
			// 	test: /\.css|less$/,
			// 	exclude: /assets/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: [
			// 			{
			// 				loader: "css-loader",
			// 				options: {
			// 					modules: true,
			// 					localIdentName:
			// 						"[name]_[local]--[hash:base64:5]",
			// 					minimize: false
			// 				}
			// 			},
			// 			"postcss-loader",
			// 			"less-loader"
			// 		]
			// 	})
			// },

			{
				test: /\.(js|jsx|mjs)$/,
				include: /node_modules\/antd/,
				loader: "babel-loader",
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
		new HtmlWebpackPlugin({
			template: rootPath + "/index.html",
			favicon: rootPath + "/assets/images/favicon.ico"
		}),
		new ExtractTextPlugin("assets/css/[name].css"),
		new webpack.DllReferencePlugin({
			manifest: require("../resources/mainfest/vendor-mainfest.json")
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, "../server"),
				to: "server"
			}
		])
	]
};

module.exports = webpackConfig;
