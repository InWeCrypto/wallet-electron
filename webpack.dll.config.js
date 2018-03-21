const path = require("path");
const webpack = require("webpack");
var rootPath = path.join(__dirname, "./app/src");
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
			"react-router-redux"
		]
	},
	output: {
		path: path.join(__dirname, "/resources/mainfest/"),
		filename: "[name].dll.js",
		library: "[name]_library"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(
				__dirname,
				"resources/mainfest",
				"[name]-mainfest.json"
			),
			name: "[name]_library",
			context: __dirname
		})
	]
};
module.exports = webpackDll;
