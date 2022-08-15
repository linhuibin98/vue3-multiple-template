import type { IncomingMessage, ServerResponse } from 'http'

export default {
  req: {} as IncomingMessage,
  res: {} as ServerResponse,
  /* header */
  get header() {
    return this.req.headers
  },
  set header(val) {
    this.req.headers = val
  },
  get headers() {
    return this.req.headers
  },
  set headers(val) {
    this.req.headers = val
  },
  /* url */
  get url() {
    return this.req.url
  },
  set url(val) {
    this.req.url = val
  },

  get method() {
    return this.req.method
  },

  set method(val) {
    this.req.method = val
  },

  // get protocol() {

  // },

  // get origin() {
  //   return `${this.protocol}://${this.host}`
  // },
}
