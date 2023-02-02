const HtmlWebpackPlugin = require("html-webpack-plugin")
const glob = require("glob")
const path = require("path")

// 设置项目根目录为当前所在目录，便于单元测试
const projectRoot = process.cwd()

const setMap = () => {
  const entry = {}
  const plugins = []
  // 获取入口文件路劲
  const urlList = glob.sync(path.join(projectRoot, "./src/*/index.js"))
  // 动态支持多页面打包，htmlWebPackPlugins
  urlList.forEach((url) => {
    const res = url.match(/src\/(.*)\/index\.js/)
    const pageName = res && res[1]
    // 设置entry的入口文件路径
    entry[pageName] = url
    plugins.push(
      // 根据模板生成index.html并自动注入打包后的js和css,一个页面对应1个HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: `./src/${pageName}/index.html`, // 设置模板所在位置
        favicon: path.resolve("./public/img/favicon.ico"),
        filename: `${pageName}.html`,
        chunks: ["vendors", "commons", pageName],
        // 配置html压缩
        minify: {
          // 配置压缩空格、注释、换行、js、css等
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      })
    )
  })
  return {
    entry,
    plugins,
  }
}
const { entry, plugins } = setMap()
module.exports = {
  entry,
  output: {
    // chunkhash 根据chunk的内容来生成对应的hash，不同entry会有不同chunk
    filename: "[name].js",
    // 导出打包文件前清除dist目录的内容
    clean: true,
  },
  module: {
    rules: [
      {
        test: /(\.css)|(\.scss)/,
        use: ["style-loader", "css-loader", "sass-loader"],
        // exclude与include用于排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），或者由它们组成的数组,两种同时存在时，exclude优先级更高。
        exclude: /node_modules/,
      },
      // jsx解析
      {
        test: /\.(js|jsx)$/,
        // 除掉node_modules目录，否则会令babel-loader编译其中所有的模块，严重拖慢打包的速度
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // 图片解析+文件指纹处理
      {
        test: /.(png|jpg|gif|jpeg|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]", // 设定图片的文件指纹，name为文件名，hash:8即随即生成的MD5的前8位，ext是文件后缀
            },
          },
        ],
      },
      // 小图转base64
      // {
      //   test: /.(png|svg|jpg|gif|ico)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10240,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [...plugins],
}
