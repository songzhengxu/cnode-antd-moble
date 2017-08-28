const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 单独打包css
const autoprefixer = require('autoprefixer'); // 自动加前缀的插件
const pxtorem = require('postcss-pxtorem'); // 自动加前缀的插件
const path = require('path');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/Iconfont'),
];

module.exports = {
  devtool: false,
  entry: {
    index: [
      './index.jsx',
    ],
    vendor: ['bundle-loader', 'rc-form', 'react-hot-loader', 'redux-promise', 'redux-thunk'],
  },
  output: {
    filename: '[name].[chunkhash].js',

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
    extensions: ['.web.js', '.jsx', '.js', '.json'],
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
    // 添加系统全局变量
    new webpack.DefinePlugin({ // 编译成生产版本
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // 压缩时去掉js所有注释，包括copyright信息。
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false,
      },
    }),
    // 自动生成所需要的html模板
    new HtmlWebpackPlugin({
      template: './Template/index.html',
      filename: '../index.html', // 生成的html存放路径，相对于 path
    }),
    new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true, disable: false }),
  ],
};
