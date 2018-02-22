var webpackBaseConfig = require("./build/webpack.base");
var webpackDevConfig = require("./build/webpack.dev");
var webpackProConfig = require("./build/webpack.pro");
var webpackMerge = require("webpack-merge");
var webpackConfig;
// if (process.env.NODE_ENV === "development") {
// 	webpackConfig = webpackMerge(webpackBaseConfig, webpackDevConfig);
// }
// if (process.env.NODE_ENV === "production") {
// 	webpackConfig = webpackMerge(webpackBaseConfig, webpackProConfig);
// }

webpackConfig = webpackMerge(webpackBaseConfig, webpackProConfig);

module.exports = webpackConfig;
