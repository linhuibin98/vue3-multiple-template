module.exports = {
  presets: [
    ['@vue/babel-preset-app', {
      polyfills: [
        'es.array.iterator',
        'es.promise',
        'es.object.assign',
        'es.promise.finally',
        'es.symbol'
      ]
    }]
  ],
  plugins: [
      ['@babel/plugin-transform-react-jsx', { pragma: 'create' }]
  ]
}