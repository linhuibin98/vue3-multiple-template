import Emitter from 'events'
import http from 'http'
import util from 'util'

import type { IncomingMessage, RequestListener, ServerResponse } from 'http'
import { Stream } from 'stream'
import onFinished from 'on-finished'
import statuses from 'statuses'
import { compose } from './compose'
import request from './request'
import response from './response'
import context from './context'
import { isFunction } from './util'

export default class App extends Emitter {
  public proxy: boolean
  public subdomainOffset: number
  public proxyIpHeader: string
  public maxIpsCount: number
  public env: string // 环境 development / production
  public keys: string[] // 签名的 cookie 密钥数组
  public compose // compose 执行中间件
  public middleware // 中间件
  public context // ctx 代理
  public request
  public response
  public inspect
  public silent // 是否不打印错误

  constructor(options) {
    super()
    options = options || {}
    this.proxy = options.proxy || false
    this.subdomainOffset = options.subdomainOffset || 2
    this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For'
    this.maxIpsCount = options.maxIpsCount || 0
    this.env = options.env || process.env.NODE_ENV || 'development'
    this.compose = options.compose || compose
    if (options.keys) this.keys = options.keys
    this.middleware = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)

    // util.inspect.custom support for node 6+
    /* istanbul ignore else */
    if (util.inspect.custom)
      this[util.inspect.custom] = this.inspect
  }

  listen(...args) {
    const server = http.createServer(this.callback())

    server.listen(...args)
  }

  callback() {
    const fn = this.compose(this.middleware)
    // 监听错误事件
    if (this.listenerCount('error') === 0)
      this.on('error', this.onerror)

    const handleRequest: RequestListener = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res
    res.statusCode = 404
    const onerror = err => ctx.onerror(err)
    const handleResponse = () => respond(ctx)
    onFinished(res, onerror)
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
  }

  createContext(req: IncomingMessage, res: ServerResponse) {
    const context = Object.create(this.context)
    const request = context.request = Object.create(this.request)
    const response = context.response = Object.create(this.response)
    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.state = {}
    return context
  }

  onerror(err) {
    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    // See https://github.com/koajs/koa/issues/1466
    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    const isNativeError
      = Object.prototype.toString.call(err) === '[object Error]'
      || err instanceof Error
    if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err))

    if (err.status === 404 || err.expose) return
    if (this.silent) return

    const msg = err.stack || err.toString()
    console.error(`\n${msg.replace(/^/gm, '  ')}\n`)
  }

  use(fn) {
    if (!isFunction(fn)) throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }
}

function respond(ctx) {
  // allow bypassing koa
  if (ctx.respond === false) return

  if (!ctx.writable) return

  const res = ctx.res
  let body = ctx.body
  const code = ctx.status
  return res.end(body)
  // TODO

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null
    return res.end()
  }

  if (ctx.method === 'HEAD') {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response
      if (Number.isInteger(length)) ctx.length = length
    }
    return res.end()
  }

  // status body
  if (body == null) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove('Content-Type')
      ctx.response.remove('Transfer-Encoding')
      ctx.length = 0
      return res.end()
    }
    if (ctx.req.httpVersionMajor >= 2)
      body = String(code)

    else
      body = ctx.message || String(code)

    if (!res.headersSent) {
      ctx.type = 'text'
      ctx.length = Buffer.byteLength(body)
    }
    return res.end(body)
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body)
  if (typeof body === 'string') return res.end(body)
  if (body instanceof Stream) return body.pipe(res)

  // body: json
  body = JSON.stringify(body)
  if (!res.headersSent)
    ctx.length = Buffer.byteLength(body)

  res.end(body)
}
