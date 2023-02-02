const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  // 配置多个入口，打包多份
  entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: "largeNumebr",
    // 打包的结果允许被引用的方式
    libraryExport: "default",
    libraryTarget: "umd",
  },
  // none可以避免默认的代码压缩
  mode: "none",
  optimization: {
    minimize: true,
    minimizer: [
      // 设置代码压缩，基于文件名来区分是否压缩
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
}
