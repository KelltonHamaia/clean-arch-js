const express = require('express')
const { routes } = require('./routes')
const { ZodError } = require('zod')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: 'Erro na validação.', erros: error.flatten() })
  }

  return res.status(500).json({ message: 'Erro interno do servidor.' })
})
module.exports = { app }
