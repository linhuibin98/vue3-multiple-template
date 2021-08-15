import webpack from "webpack";
import webpackConfig from './webpack-node.config';
import MemoryFS from 'memory-fs';
import path from 'path';

const fs = new MemoryFS();
const compiler = webpack(webpackConfig);
// @ts-ignore
compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    return;
  }
  const info = stats?.toJson() || {};

  if (stats?.hasErrors()) {
    console.error(info.errors);
  }
  if (stats?.hasWarnings()) {
    console.warn(info.warnings);
  }
  // 之后读取输出：
  if (info) {
    const content = fs.readFileSync(path.join(info?.outputPath || './', info?.assetsByChunkName?.main[0]  || './'), 'utf-8');

    eval(content);
  }
});

