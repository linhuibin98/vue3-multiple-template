const load = require('unplugin/dist/webpack/loaders/load').default

module.exports = function (source, map) {
  this.cacheable(false)
  return load.call(this, source, map)
}
