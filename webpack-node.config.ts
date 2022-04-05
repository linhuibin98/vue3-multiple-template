import { Configuration } from 'webpack';
import path from "path";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import unpluginDemo from 'unplugin-demo';

export default {
  mode: 'development',
  entry: './src/vue.ts',
  output: {
    path: path.join(__dirname, 'dest'),
    filename: 'main.js'
  },
  plugins: [
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60,
      total: 100
    }),
    unpluginDemo.webpack()
  ]
} as Configuration;