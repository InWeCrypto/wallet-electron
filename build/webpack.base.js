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
	path.join(rootPath, "/assets/js/pace.js"),
	path.join(rootPath, "/assets/less/pace.theme.less")
];
entries.message = [
	path.join(rootPath, "/assets/less/message.less"),
	path.join(rootPath, "/assets/js/message.js"),
	path.join(rootPath, "/assets/js/walletstate.js")
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
				include: rootPath,
				use: {
					loader: "babel-loader"
				}
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
							limit: 100000,
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
							limit: 3000,
							name: "assets/font/[name].[hash:9].[ext]"
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
			manifest: require("../resources/mainfest/vendor-mainfest.json"),
			context: __dirname
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
