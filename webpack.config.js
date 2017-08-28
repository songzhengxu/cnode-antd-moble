const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer'); // 自动加前缀的插件
const pxtorem = require('postcss-pxtorem'); // 自动计算Rem
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/Iconfont'),
];

// 一句话理解 path和 publicPath的作用！！！！
// path 用来存放打包后文件的输出目录
// publicPath 用来定义静态资源的引用地址


module.exports = {
  cache: true,
  devtool: 'eval',
  entry: {
    index: [
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      'webpack-dev-server/client?http://localhost:3000',
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口

      'webpack/hot/only-dev-server',
      // 为热替换(HMR)打包好代码
      // only- 意味着只有成功更新运行代码才会执行热替换(HMR)

      './index.jsx',
      // 我们 app 的入口文件
    ],
    vendor: ['bundle-loader', 'rc-form', 'react-hot-loader', 'redux-promise', 'redux-thunk'],
  },
  output: {
    filename: '[name].js',
    // 输出的打包文件

    path: `${__dirname}/dist/assets/`,
    // 项目输出路径
    publicPath: '/assets/',
    // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
    chunkFilename: '[name].[chunkhash].js',
  },

  context: `${__dirname}/src`,
  module: {
    rules: [
      {
        exclude: [
          /\.less$/,
          /\.svg$/,
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader?cacheDirectory', 'eslint-loader',
        ],
        exclude: /^node_modules$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /^node_modules$/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins() {
                return [
                  autoprefixer({
                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                  }),
                  pxtorem({ rootValue: 100, propWhiteList: [], minPixelValue: 2 }),
                ];
              },
            },
          },
          'less-loader',
        ],
        include: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins() {
                return [
                  autoprefixer({
                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                  }),
                  pxtorem({ rootValue: 100, propWhiteList: [], minPixelValue: 2 }),
                ];
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
         // 匹配.html文件
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
            },
          },
        ],
        exclude: /^node_modules$/,
      },
      {
        test: /favicon\.png$/,
        use: [
          {
           // 使用file-loader
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
        exclude: /^node_modules$/,
      },

      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs,
      },
      {
        // 处理静态资源
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],

  },
  resolve: {
    extensions: ['.web.js', '.jsx', '.js', '.less', '.json'],
    alias: {
      '~': `${__dirname}/src`,
    },
  },
  externals: {
    moment: 'moment',
    axios: 'axios',
    react: 'React',
    redux: 'Redux',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'prop-types': 'PropTypes',
    'babel-polyfill': 'window',
  },
  plugins: [
    // 将第三方库单独打包
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
    new webpack.HotModuleReplacementPlugin(),
      // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new BundleAnalyzerPlugin(),
    // webpack打包性能分析插件
    new HtmlWebpackPlugin({
      template: './Template/index.html',
      filename: './index.html', // 生成的html存放路径，相对于 path
    }),
    // 生成html文件
  ],
};
