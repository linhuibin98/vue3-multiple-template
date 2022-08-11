/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import legacyPlugin from '@vitejs/plugin-legacy';
import * as path from 'path';
import vuePlugin from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss'
const unpluginDemo = require('@linhuibin/unplugin-demo')

// @see https://cn.vitejs.dev/config/
export default ({
  command,
  mode
}) => {
  let rollupOptions = {};


  let optimizeDeps = {};


  let alias = {
    '.git': path.resolve(__dirname, './.git'),
    '.github': path.resolve(__dirname, './.github'),
    'auto-gen-doc': path.resolve(__dirname, './auto-gen-doc'),
    'babel': path.resolve(__dirname, './babel'),
    'check-lib-version': path.resolve(__dirname, './check-lib-version'),
    'dest': path.resolve(__dirname, './dest'),
    'dist': path.resolve(__dirname, './dist'),
    'esbuild': path.resolve(__dirname, './esbuild'),
    'eslint': path.resolve(__dirname, './eslint'),
    'Micro-FE': path.resolve(__dirname, './Micro-FE'),
    'node': path.resolve(__dirname, './node'),
    'node_modules': path.resolve(__dirname, './node_modules'),
    'public': path.resolve(__dirname, './public'),
    'react': path.resolve(__dirname, './react'),
    'src': path.resolve(__dirname, './src'),
    'swc': path.resolve(__dirname, './swc'),
    'virtural-dom': path.resolve(__dirname, './virtural-dom'),
    'web-worker': path.resolve(__dirname, './web-worker'),
    'webpack': path.resolve(__dirname, './webpack'),
    '@': path.resolve(__dirname, './src'),
  }

  let proxy = {}

  // todo 替换为原有变量
  let define = {
    'process.env.NODE_ENV': command === 'serve' ? '"development"' : '"production"',
  }

  let esbuild = {}

  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: define,
    server: {
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'build', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      legacyPlugin({
        targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
      }), 
      vuePlugin(),
      WindiCSS(),
      unpluginDemo.vite()
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
  };
};