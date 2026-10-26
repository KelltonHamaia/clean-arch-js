require('dotenv/config')
const express = require('express')
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')
const { ZodError } = require('zod')

const typeormServer = require('../../infra/db/typeorm/setup')
const { routes } = require('./routes')
const { sendMailQueue } = require('../../infra/queue/bull')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/queues')

createBullBoard({
  queues: [new BullAdapter(sendMailQueue)],
  serverAdapter,
})

typeormServer
  .initialize()
  .then(() => {
    app.use(routes)
    app.use('/queues', serverAdapter.getRouter())

    app.use((error, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
      }

      if (error instanceof ZodError) {
        return res.status(400).json({ message: 'Erro na validação.', erros: error.flatten() })
      }
      console.log(error)
      return res.status(500).json({ message: 'Erro interno do servidor.' })
    })
  })
  .catch((error) => {
    console.log('Erro ao inicializar a aplicação: ', error)
  })

module.exports = { app }
