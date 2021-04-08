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
  },
  module: {
    rules: [
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