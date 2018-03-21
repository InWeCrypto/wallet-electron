var webpack = require("webpack");
var config = require("../config");
var webpackDevConfig = {
	devtool: "cheap-module-source-map",
	output: {
		path: config.outputRoot,
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
		sourceMapFilename: "[file].map"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(["pace", "message", "vendor"])
	]
};
module.exports = webpackDevConfig;
