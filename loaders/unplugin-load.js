/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
'use strict'
const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __export = (target, all) => {
  for (const name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
const __copyProps = (to, from, except, desc) => {
  if (from && typeof from === 'object' || typeof from === 'function') {
    for (const key of __getOwnPropNames(from)) {
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable })
    }
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target, mod))
const __toCommonJS = mod => __copyProps(__defProp({}, '__esModule', { value: true }), mod)

// src/webpack/loaders/load.ts
const load_exports = {}
__export(load_exports, {
  default: () => load,
})
module.exports = __toCommonJS(load_exports)

// src/webpack/context.ts
const import_path = require('path')
const import_webpack_sources = __toESM(require('webpack-sources'))
const import_acorn = require('acorn')
function createContext(compilation) {
  return {
    parse(code, opts = {}) {
      return import_acorn.Parser.parse(code, {
        sourceType: 'module',
        ecmaVersion: 'latest',
        locations: true,
        ...opts,
      })
    },
    addWatchFile(id) {
      (compilation.fileDependencies ?? compilation.compilationDependencies).add((0, import_path.resolve)(process.cwd(), id))
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name
      if (emittedFile.source && outFileName) {
        compilation.emitAsset(outFileName, import_webpack_sources.default
          ? new import_webpack_sources.default.RawSource(typeof emittedFile.source === 'string' ? emittedFile.source : Buffer.from(emittedFile.source))
          : {
              source: () => emittedFile.source,
              size: () => emittedFile.source.length,
            })
      }
    },
    getWatchFiles() {
      return Array.from(compilation.fileDependencies ?? compilation.compilationDependencies)
    },
  }
}

// src/webpack/utils.ts
function slash(path) {
  return path.replace(/\\/g, '/')
}

// src/webpack/loaders/load.ts
async function load(source, map) {
  let _a
  const callback = this.async()
  const { unpluginName } = this.query
  const plugin = (_a = this._compiler) == null ? void 0 : _a.$unpluginContext[unpluginName]
  let id = this.resource
  if (!(plugin == null ? void 0 : plugin.load) || !id)
    return callback(null, source, map)

  this.cacheable(false)

  const context = {
    error: error => this.emitError(typeof error === 'string' ? new Error(error) : error),
    warn: error => this.emitWarning(typeof error === 'string' ? new Error(error) : error),
  }
  if (id.startsWith(plugin.__virtualModulePrefix))
    id = id.slice(plugin.__virtualModulePrefix.length)

  const res = await plugin.load.call(Object.assign(this._compilation && createContext(this._compilation), context), slash(id))
  if (res == null)
    callback(null, source, map)

  else if (typeof res !== 'string')
    callback(null, res.code, res.map ?? map)

  else
    callback(null, res, map)
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {})
