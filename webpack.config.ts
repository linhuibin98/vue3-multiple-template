import { join, resolve } from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import unpluginDemo from '@linhuibin/unplugin-demo'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'
import ProgressBarWebpackPlugin from 'webpackbar'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
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
  cache: false,
  // cache: {
  //   type: 'filesystem', // filesystem 基于文件系统缓存, memory 基于内存的临时缓存
  //   buildDependencies: { // 提供额外依赖，用于判断缓存是否失效
  //     config: [
  //       __filename,
  //       // join(env.mfexBuildPath, 'package.json'),
  //       join(__dirname, 'pnpm-lock.yaml'),
  //       // join(env.context, 'build.config.js')
  //     ],
  //   },
  //   name: 'webpack-internal-cache',
  //   cacheLocation: join(__dirname, './node_modules/.cache/webpack-cache-build'),
  //   managedPaths: [
  //     join(__dirname, 'node_modules'),
  //     // new RegExp(esr('?!_virtual_')),
  //     // new RegExp(esr(join(__dirname, 'node_modules'))),
  //     // new RegExp(esr(join(__dirname, 'node_modules/(?!@mfex)'))),
  //     // join(env.mfexBuildPath, 'node_modules')
  //   ],
  //   idleTimeoutForInitialStore: 0,
  //   // version: , // 可用于缓存是否失效
  // },
  // snapshot: {
  //   managedPaths: [
  //     join(__dirname, 'node_modules'),
  //     //
  //     // new RegExp(esr(join(__dirname, 'node_modules'))),
  //     // new RegExp(esr(join(__dirname, 'node_modules/(?!@mfex)'))),
  //     // join(env.mfexBuildPath, 'node_modules')
  //   ],
  // },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.vue', '.js', '.json', '.cjs', '.mjs'],
    alias: {
      '@': resolve('src'),
    },
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime~${entrypoint.name}`,
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
