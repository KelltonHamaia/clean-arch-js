const express = require('express')
const { routes } = require('./routes')
const { ZodError } = require('zod')
const typeormServer = require('../../infra/db/typeorm/setup')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

typeormServer
  .initialize()
  .then(() => {
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
  })
  .catch((error) => {
    console.log('Erro ao inicializar a aplicação: ', error)
  })

module.exports = { app }
