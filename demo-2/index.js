// package中配置了main，导出的入口文件为当前的index.js
// 根据环境判断选择是否压缩的文件
if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/large-number.min.js")
} else {
  module.exports = require("./dist/large-number.js")
}
