const merge = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [],
  devServer: {
    hot: true, // 开启热更新
  },
  stats: 'errors-only', // 控制输出日志
  devtool: 'cheap-source-map', // 设置source map
  optimization: {
    minimize: true, // true-告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // 压缩js文件，uglify-js不再维护且不支持es6+
    usedExports: true,
    // 分离公共依赖的chunks
    splitChunks: {
      minSize: 0,
      // cacheGroups用来继承和/或覆盖来自 splitChunks.* 的任何选项
      cacheGroups: {
        commons: {
          minChunks: 2,
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
