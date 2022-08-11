const { join, resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const unpluginDemo = require('@linhuibin/unplugin-demo')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const ProgressBarWebpackPlugin = require('webpackbar')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    // 增加chunkFilename
    chunkFilename: '[name].[contenthash:8].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.vue', '.js', '.json', '.cjs', '.mjs'],
    alias: {
      '@': resolve('src'),
    },
  },
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
    emitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        parallel: true,
      }),
      '...',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|svga|ico|mp3|mp4|woff|ttf|eot|woff2)$/i,
        // type: 'asset/resource', // 输出链接
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024, // 小于2k的文件，直接使用 Base64 编码进行处理
              fallback: 'file-loader',
              esModule: true,
              // context: process.cwd(),
              outputPath: 'asset',
              name: '[folder]/[name]~[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 编译时不类型检查
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarWebpackPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'public/index.html'),
    }),
    unpluginDemo.webpack(),
    new WindiCSSWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/asset/',
          to: 'asset/',
          force: true,
        },
      ],
    }),
  ],
}
