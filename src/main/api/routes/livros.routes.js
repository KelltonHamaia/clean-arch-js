const { Router } = require('express')
const cadastrarLivroCompose = require('../composers/cadastrar-livro.compose')
const buscarLivroPorNomeOuIsbnCompose = require('../composers/buscar-livro-por-nome-ou-isbn.compose')

const livrosRoutes = Router()

livrosRoutes.post('/', async (req, res) => {
  const httpRequest = {
    body: req.body,
  }
  const { statusCode, body } = await cadastrarLivroCompose(httpRequest)
  res.status(statusCode).json(body)
})

livrosRoutes.get('/', async (req, res) => {
  const httpRequest = {
    query: req.query,
  }
  const { statusCode, body } = await buscarLivroPorNomeOuIsbnCompose(httpRequest)
  res.status(statusCode).json(body)
})

module.exports = { livrosRoutes }
