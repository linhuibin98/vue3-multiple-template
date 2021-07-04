import { join, resolve } from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

export default {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.vue', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    compress: true,
    port: 8080,
    inline: true,
    hot: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
        //     {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 2 * 1024, // 小于2k的图片，直接使用Base64编码进行处理
        //     outputPath: '/image/'
        //   }
        // },
          {
          loader: 'file-loader',
        }]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        // loader: './src/loaders/loader1.js'  // 自定义loader
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 编译时不类型检查
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'public/index.html')
    }),
    new VueLoaderPlugin()
  ]
}