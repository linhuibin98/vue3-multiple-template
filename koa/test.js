// const Koa = require('koa')
const Koa = require('./index').default

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'Hello Koa'
  next()
})

app.listen(3003, () => {
  console.log('server is running at http://127.0.0.1:3003')
})
