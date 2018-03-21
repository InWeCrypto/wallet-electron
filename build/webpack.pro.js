var webpack = require("webpack");
var config = require("../config");
var webpackProConfig = {
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].js",
		chunkFilename: "assets/js/[name].js",
		publicPath: "./",
		sourceMapFilename: "[file].map"
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	output: {
		// 		comments: false
		// 	},
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	sourceMap: true
		// }),
		new webpack.optimize.CommonsChunkPlugin(["pace", "message"])
	]
};

module.exports = webpackProConfig;
