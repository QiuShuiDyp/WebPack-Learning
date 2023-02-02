const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyPlugin = require("friendly-errors-webpack-plugin");
const baseConfig = require("./webpack.base");

const devConfig = {
  mode: "development",
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyPlugin(),
  ],
  devServer: {
    hot: true, // 开启热更新
  },
  stats: "errors-only", // 控制输出日志
  devtool: "cheap-source-map", // 设置source map
};

module.exports = merge(baseConfig, devConfig);
