import express from 'express'

const app = express()

const PORT = '3000'

app.use(express.static('./dist/'))

app.use((req, res) => {
  res.redirect(301, '/index.html')
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listen as http://localhost:${PORT}`)
})
