import { join, resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import unpluginDemo from '@linhuibin/unplugin-demo';

export default {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    // 增加chunkFilename
    chunkFilename: "[name].[contenthash].js",
  },
  devtool: "inline-source-map",
  // 使用splitChunks默认策略拆包，同时提取runtime
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: true,
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
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".vue", ".js"],
    alias: {
      "@": resolve("src"),
    },
  },
  devServer: {
    compress: false,
    port: 8080,
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 2 * 1024, // 小于2k的图片，直接使用Base64编码进行处理
              outputPath: "/image/",
            },
          },
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        // loader: './src/loaders/loader1.js'  // 自定义loader
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
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
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "public/index.html"),
    }),
    // 打包后文件压缩插件
    new CompressionPlugin(),
    unpluginDemo.webpack(),
  ],
};
