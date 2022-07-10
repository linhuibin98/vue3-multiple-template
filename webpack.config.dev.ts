import { join, resolve } from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import unpluginDemo from '@linhuibin/unplugin-demo'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'
import ProgressBarWebpackPlugin from 'webpackbar'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem', // filesystem 基于文件系统缓存, memory 基于内存的临时缓存
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.vue', '.js', '.json', '.cjs', '.mjs'],
    alias: {
      '@': resolve('src'),
    },
  },
  devServer: {
    compress: false,
    port: 8081,
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|svga|ico|mp3|mp4|woff|ttf|eot|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024, // 小于2k的文件，直接使用 Base64 编码进行处理
              fallback: 'file-loader',
              esModule: true,
              outputPath: 'dist/asset/',
              name: '[folder]/[name].[ext]',
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
          'style-loader',
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
    new VueLoaderPlugin(),
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
