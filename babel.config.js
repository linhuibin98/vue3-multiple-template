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
  ]
}