// 测试脚本
const path = require("path")
const webpack = require("webpack")
const rimraf = require("rimraf")

process.chdir(path.join(__dirname, "template"))

// 删除/dist目录之后，后面的回调
rimraf("./dist", () => {
  const prodConfig = require("../../lib/webpack.prod")
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(
      stats.toString({
        colors: true,
        module: false,
        children: false,
      })
    )
  })
})
