import { join, resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// import CompressionPlugin from 'compression-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
// import TerserWebpackPlugin from 'terser-webpack-plugin'
// import HtmlMinimizerWebpackPlugin from 'html-minimizer-webpack-plugin'
import unpluginDemo from '@linhuibin/unplugin-demo'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'
import { ProgressPlugin } from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  entry: './src/index.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    // 增加chunkFilename
    chunkFilename: '[name].[contenthash:8].js',
  },
  // stats: 'verbose', // verbose 输出全部信息
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem', // filesystem 基于文件系统缓存, memory 基于内存的临时缓存
  },
  // 使用splitChunks默认策略拆包，同时提取runtime
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
      // new CssMinimizerPlugin({
      //   parallel: true,
      // }),
      // new TerserWebpackPlugin({
      //   parallel: true,
      // }),
      // new HtmlMinimizerWebpackPlugin({
      //   parallel: true,
      // }),
    ],
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
        test: /\.(png|jpg|jpeg|gif|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024, // 小于2k的图片，直接使用Base64编码进行处理
            },
          },
          {
            loader: 'file-loader',
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
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'public/index.html'),
    }),
    // 打包后文件压缩插件
    // new CompressionPlugin(),
    unpluginDemo.webpack(),
    new WindiCSSWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/asset/**/*',
          to: 'asset/[name][ext]',
        },
      ],
    }),
  ],
}
