import { Configuration } from 'webpack';
import path from "path";
import ProgressBarPlugin from "progress-bar-webpack-plugin";

export default {
  mode: 'development',
  entry: './src/test.js',
  output: {
    path: path.join(__dirname, 'dest'),
    filename: '[name]-[hash:8].js'
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60,
      total: 100
    })
  ]
} as Configuration;